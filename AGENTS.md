# INOPNC Development Rules

- Greenfield modular monolith; legacy code is read-only reference.
- Features import the design system through `@/design-system`, never SEED packages directly.
- Use persona tokens, neutral card borders, and no decorative role ribbons.
- Desktop content max-width is 1256px; mobile-first responsive PWA.
- Keep page composition-only; server/database mutations belong outside page components.
