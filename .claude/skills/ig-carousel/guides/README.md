# Composition guide overlays

Transparent PNG overlays for video editors (CapCut, Premiere, DaVinci, Final Cut, Edits): put one on a track above your clip.

- Folders by ratio: `16x9` (1920×1080), `9x16` (1080×1920), `4x5` (1080×1350), `3x4` (1080×1440), `1x1` (1080×1080).
- Each guide in yellow (`#ffc400`) and white: `<ratio>-<guide>-<yellow|white>.png`.
- Guides: `thirds` (rule of thirds), `phi` (golden ratio grid), `spiral` (Fibonacci spiral), `leading` (leading lines), `symmetry`, `center`, `dutch` (Dutch angle), `framein` (frame within a frame, outside darkened), `triangles` (golden triangles), `horizon`.

They come from the Carousel Artboard's own guide drawing (`slide.guide`, `window.__guidePNG({kind, color}, w, h)`); on the board, any slide can carry one (large view → Frame → Composition guide) with its own color, thickness, opacity and mirroring.
