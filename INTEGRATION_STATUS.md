# V2 integration status

## Sources
- main: 1d2a64da0944fce9b483466fc5e1e53fc9211676
- V2 design: 1dafb7ab89711ce739e6715b22f99e2da057f2ce (PR 2)
- V1 corrections: 3be84f04e830ab22dba47def77f1afc3d04a30eb (PR 1)

## Integrated
- Resolved seven merge conflicts while retaining current chat inbox and planning UI.
- Preserved V2 mobile dashboard, navigation, branding and project cards.
- Included design-v2.css in production build (previous build omitted it).
- Applied asynchronous server saves to newer planning edit, delete and drag/drop actions.
- Corrected mobile planning routes and employee quick actions.
- Preserved chat drafts when opening projects through the chat inbox.
- Blocked allocation moves to absent employees in UI and server policy.
- Retained backend validation, annual leave, month closure and time correction logic.

## Validation
- 31 automated domain, server policy and DOM tests pass with the combined script order.
- Static build passes and includes V2 styles.
- These tests simulate persistence; they do not prove the Supabase connection.

## Deployment blocker discovered during integration
The existing Supabase ION BAU project has 31 normalized public tables, RLS and business-rule functions (including close_work_month, guard_planning_absence_conflict and mark_chat_read). None is an ion_state/ion_sessions/ion_files table used by the old PR 1 server. The integration currently retains that old server for review and tests, but MUST NOT be presented as connected to the existing Supabase backend. Do not run scripts/setup.cjs against that project or create a competing state store. The next implementation is an adapter to the existing Supabase Auth, tables, RPCs and storage, with integration tests against that model. Existing Supabase schema/data were not changed.

Vercel team/project access now succeeds. Production main and its visibility have not been changed. This branch is a development checkpoint, not release-ready.
