# Watchman · Federal record by administration — architecture note

## Domain

The federal record is one list of dated, sourced actions. Everything a reader asks for is a
*window* onto that list:

| Reader question | Window |
| --- | --- |
| What did this administration do? | dates `[administration.start, administration.end)` |
| What did this Congress pass? | dates `[congress.start, congress.end)` ∩ administration, legislative branch |
| What did the courts decide? | administration window, judicial branch |
| What did this department do? | administration window, tagged with the department |

So there is one record list and three small registries, not new record copies:

- `administrations.ts` — four administrations (id, president, term label, start, end?, `status: 'recorded' | 'coming'`).
  Congress numbers are derived from dates (`congressOf(n)` → Jan 3 of `1789 + 2(n-1)` to Jan 3 two years later),
  so an administration lists its Congresses without a hand-kept table.
- `departments.ts` — six departments. Each holds its leaders (tenures with name, title, acting flag, start, end,
  source), its stats (each with source, as-of date, and an explicit gap note when data is missing), and key actions
  (a record id from the chronicle, or a dated external item with its own primary source).
- `departmentTags.ts` — which records belong to which department, until records carry the field themselves.

`departmentsOf(record)` reads `record.departments` first and falls back to the tag table. The field is optional
and is *not* added to `RecordItem` here, so the sibling branch `watchman/records-data-early-term` can add
`departments?: string[]` to the type without a merge conflict; once it lands, the tag table is deleted.

Invalid states the model rules out: a department page with no administration (routes are nested under an
administration id); a stat without a source or as-of date (both are required fields); a leader band with
overlapping guesswork (tenures are ordered and the band is drawn from their dates; an unknown end is "present").

## Views (subtract before add)

No new list component. Every chronicle view is the existing `Ledger` + `RecordItem` with a filtered record
array, so branch row coloring, filters and `ledger.js` work unchanged. New components are only what the new
questions need:

- `AdminCard` — one administration door (dates, status).
- `LeaderBand` — SVG band (attributes only, CSP-safe) + an ordered list of leaders under it.
- `StatBlock` — one statistic: figure or SVG bar series, source link, as-of date, gap note.
- `RecordPage` — the existing DoorPage shell (nav + small hero + main) generalized with an `up` link and kicker.

## Routes

```
/watchman/federal/                              administration picker
/watchman/federal/{obama|trump-1|biden|trump-2}/ administration page (coming state when no records)
/watchman/federal/trump-2/chronicle/            all actions in the administration
/watchman/federal/trump-2/congress/{119|120}/   one Congress
/watchman/federal/trump-2/judicial/             court actions
/watchman/federal/trump-2/departments/          department index
/watchman/federal/trump-2/departments/{war|homeland-security|state|justice|treasury|hhs}/
/watchman/federal/chronicle-classic/            the previous federal page, unchanged in behavior
```

Sub-routes are generated only for administrations with `status: 'recorded'`.

## Constraints kept

Strict CSP (no `style=`, no inline script; SVG sizes via attributes); the existing palette, type and branch
swatches; no Scripture on these pages (none shown, so no NKJV notice needed); door labels untouched; 390px first.
