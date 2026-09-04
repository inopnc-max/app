alter table public.invitations drop constraint if exists invitations_internal_target_check;
alter table public.invitations add constraint invitations_internal_target_check check (target_persona in ('worker','site_manager','production_manager')) not valid;

create or replace function public.accept_internal_invitation(p_token_hash text)
returns public.persona language plpgsql security definer set search_path='' as $$
declare inv public.invitations%rowtype; target public.persona;
begin
 if auth.uid() is null then raise exception 'unauthenticated'; end if;
 select * into inv from public.invitations where token_hash=p_token_hash for update;
 if not found or inv.expires_at<=now() or inv.revoked_at is not null or inv.accepted_at is not null then raise exception 'invalid invitation'; end if;
 if inv.target_persona not in ('worker','site_manager','production_manager') then raise exception 'invalid target'; end if;
 update public.profiles set persona=inv.target_persona,account_status='active',updated_at=now() where id=auth.uid() and persona is null and account_status='pending';
 if not found then raise exception 'profile not eligible'; end if;
 update public.invitations set accepted_at=now(),accepted_by=auth.uid() where id=inv.id;
 insert into public.audit_events(actor_id,event_type,metadata) values(auth.uid(),'invitation.accepted',jsonb_build_object('invitation_id',inv.id,'target_persona',inv.target_persona));
 target:=inv.target_persona; return target;
end $$;

create or replace function public.approve_partner_access_request(p_request_id uuid,p_organization_id uuid,p_new_organization_name text,p_site_grants jsonb)
returns jsonb language plpgsql security definer set search_path='' as $$
declare r public.access_requests%rowtype; o public.organizations%rowtype; g jsonb; sid uuid; lvl public.site_access_level; orgid uuid;
begin
 if not private.is_admin_aal2_self() then raise exception 'forbidden'; end if;
 select * into r from public.access_requests where id=p_request_id for update;
 if not found or r.status<>'pending' then raise exception 'invalid request'; end if;
 if not exists(select 1 from public.profiles where id=r.profile_id and persona is null and account_status='pending') then raise exception 'profile not eligible'; end if;
 if jsonb_typeof(p_site_grants)<>'array' or jsonb_array_length(p_site_grants)=0 then raise exception 'site grants required'; end if;
 if p_organization_id is not null then select * into o from public.organizations where id=p_organization_id for update; if not found or o.type<>'partner' or o.status<>'active' then raise exception 'invalid organization'; end if; orgid:=o.id;
 elsif nullif(trim(p_new_organization_name),'') is not null then select * into o from public.organizations where type='partner' and status='active' and normalized_name=lower(regexp_replace(trim(p_new_organization_name),'\\s+',' ','g')) limit 1 for update; if found then orgid:=o.id; else insert into public.organizations(type,name,normalized_name,status) values('partner',trim(p_new_organization_name),lower(regexp_replace(trim(p_new_organization_name),'\\s+',' ','g')),'active') returning * into o; orgid:=o.id; end if;
 else raise exception 'organization required'; end if;
 for g in select * from jsonb_array_elements(p_site_grants) loop sid:=(g->>'site_id')::uuid; lvl:=(g->>'access_level')::public.site_access_level; if not exists(select 1 from public.sites where id=sid and status='active') then raise exception 'invalid site'; end if; insert into public.organization_site_grants(organization_id,site_id,access_level,status,granted_by,granted_at) values(orgid,sid,lvl,'active',auth.uid(),now()) on conflict(organization_id,site_id) do update set access_level=excluded.access_level,status='active',granted_by=excluded.granted_by,granted_at=excluded.granted_at; end loop;
 update public.profiles set persona='partner',account_status='active',display_name=r.name,updated_at=now() where id=r.profile_id;
 insert into public.organization_memberships(organization_id,profile_id,membership_type,job_title,status) values(orgid,r.profile_id,'partner',r.job_title,'active') on conflict(organization_id,profile_id) do update set status='active',job_title=excluded.job_title;
 update public.access_requests set status='approved',reviewed_by=auth.uid(),reviewed_at=now(),rejection_reason=null,updated_at=now() where id=r.id;
 insert into public.audit_events(actor_id,event_type,metadata) values(auth.uid(),'access_request.approved',jsonb_build_object('request_id',r.id,'organization_id',orgid,'site_count',jsonb_array_length(p_site_grants)));
 return jsonb_build_object('request_id',r.id,'organization_id',orgid);
end $$;

create or replace function public.reject_access_request(p_request_id uuid,p_reason text) returns void language plpgsql security definer set search_path='' as $$
begin if not private.is_admin_aal2_self() then raise exception 'forbidden'; end if; if length(trim(coalesce(p_reason,'')))=0 or length(trim(p_reason))>500 then raise exception 'invalid reason'; end if; update public.access_requests set status='rejected',reviewed_by=auth.uid(),reviewed_at=now(),rejection_reason=trim(p_reason),updated_at=now() where id=p_request_id and status='pending'; if not found then raise exception 'invalid request'; end if; insert into public.audit_events(actor_id,event_type,metadata) values(auth.uid(),'access_request.rejected',jsonb_build_object('request_id',p_request_id)); end $$;
revoke all on function public.accept_internal_invitation(text),public.approve_partner_access_request(uuid,uuid,text,jsonb),public.reject_access_request(uuid,text) from public,anon;
grant execute on function public.accept_internal_invitation(text),public.approve_partner_access_request(uuid,uuid,text,jsonb),public.reject_access_request(uuid,text) to authenticated;
