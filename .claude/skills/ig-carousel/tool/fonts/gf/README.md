# Bundled fonts (Google Fonts, SIL Open Font License)

Latin and Latin Extended subsets as woff2, loaded by the board's `@font-face` rules (`fonts/gf/...`).
Fonts the user asked for that are paid or Apple-only are stood in for by free look-alikes:

| In the menu | Font file family | Stands in for |
|---|---|---|
| SF Pro | Inter (the device's own SF Pro on Apple devices) | SF Pro (Apple) |
| Druk Wide look-alike | Archivo, width 125 | Druk Wide (Commercial Type) |
| Bebas Neue | Bebas Neue | |
| Playfair Display | Playfair Display | |
| Apple Garamond look-alike | EB Garamond | Apple Garamond (Apple) |
| Perfectly Nineties look-alike | Fraunces | Perfectly Nineties (paid) |
| Lore look-alike | Pirata One | Lore (Dawnland, blackletter) |
| Sloop Script look-alike | Pinyon Script | Sloop Script (Font Bureau) |
| Caveat | Caveat | |
| Fredoka | Fredoka | |

Regenerate with the Google Fonts CSS2 API (a desktop Chrome user agent returns woff2), keeping the `latin` and `latin-ext` faces.
