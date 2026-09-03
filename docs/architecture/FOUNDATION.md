# Foundation Architecture

INOPNC uses a modular monolith with Next App Router. Server concerns (session, RLS-aware queries, commands) remain separate from client interaction state. Design dependencies are isolated behind `src/design-system`; the shared AppShell will consume persona configuration via `data-persona`. Desktop content is capped at 1256px and responsive layouts target mobile, tablet, and desktop breakpoints. PWA metadata is provided by the web manifest; sensitive application data must never be cached.
