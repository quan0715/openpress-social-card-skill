# press/media/SOURCES.md

Source-of-record for every image in this workspace that did **not** come from
the user. Web-sourced or generated images must appear here before they can be
referenced from any card. Missing entries should be treated as a delivery
blocker — when OpenPress ships `openpress validate`, that command is expected
to enforce this contract.

## Schema

```
- file: <filename>
  origin: user | web | generated
  url: <upstream URL, required for origin=web>
  license: <e.g. CC-BY-SA-4.0, unknown, proprietary, generated-by-<model>>
  retrieved: <YYYY-MM-DD, required for origin=web>
  notes: <attribution, license obligations, usage restrictions>
```

## Entries

(none yet — replace the placeholder SVG before adding real content)
