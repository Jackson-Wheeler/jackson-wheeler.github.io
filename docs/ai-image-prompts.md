# AI image prompts — Watchman Records doors

Jackson allowed AI-generated pictures for this exploration. The built branches use real public-domain / CC images (see `docs/door-image-credits.md` on each branch); these prompts are for generating alternates. Shared style suffix for every prompt:

> *Style: night scene, warm brass and amber lamplight against deep warm-black (#0f0d0b), muted desaturated palette, subtle film grain, dignified and quiet, no text, no logos, no official seals, no recognizable real people. Leave dark negative space on the left third for a caption.*

Recommended outputs: 2400×1030 (21:9, desktop) and 1200×1500 (4:5, phone) per image; export to AVIF/WebP at 1600w and 800w like the existing pipeline. Do not generate official seals (Great Seal of the United States, Great Seal of California, LA City/County seals); see legal notes at the end.

## 1. `fullbleed` — full-bleed night photograph
- **Federal:** "The United States Capitol at blue hour seen from the west front, dome lit warm gold, Capitol reflecting in still water, low mist, long-exposure cinematic photograph, 21:9."
- **California:** "The California State Capitol in Sacramento at night, white dome glowing amber, palm and cedar silhouettes framing it, deep indigo sky fading to black, cinematic photograph."
- **LA City/County:** "Los Angeles City Hall tower at night from Grand Park, art-deco pyramid top glowing warm, fountains in the foreground, quiet empty plaza, cinematic photograph."

## 2. `plate` — engraved brass plate
- **Federal:** "Steel-engraving style etching of the US Capitol dome in fine crosshatched lines, printed in brass ink on near-black, oval vignette, 19th-century banknote engraving style."
- **California:** "Banknote-style engraving of the California State Capitol with Sierra Nevada peaks behind, brass ink on black, oval vignette, fine guilloche border."
- **LA City/County:** "Fine line engraving of Los Angeles City Hall tower with rays of sun behind, brass ink on black, oval vignette, intaglio printing texture."

## 3. `split` — split image / text
- **Federal:** "Lincoln Memorial at night, the seated statue lit from below between Doric columns, reflecting pool in foreground, symmetrical, moody."
- **California:** "Golden Gate Bridge at night in fog, one tower lit amber, fog rolling through the cables, from Marin headlands, cinematic."
- **LA City/County:** "Griffith Observatory at night, copper domes glowing, city lights spread below, stars faintly visible, cinematic."

## 4. `emblem` — medallion (original, non-official)
- **Federal:** "Original circular brass medallion, thirteen small stars arcing over a stylized capitol dome, embossed metal on black velvet, studio macro photograph, no words, not an official seal."
- **California:** "Original circular brass medallion with a single five-pointed star above stylized Sierra Nevada peaks, embossed metal on black velvet, studio macro, no words, not an official seal."
- **LA City/County:** "Original circular brass medallion with an art-deco civic tower and radiating sun rays, embossed metal on black velvet, studio macro, no words, not an official seal."

## 5. `monument` — epic monument silhouette
- **Federal:** "Silhouette of six Marines raising a flag on a rocky summit at dawn, heroic bronze-statue style, backlit by an amber sky, monumental, inspired by the Marine Corps War Memorial (not a copy of the 1945 photograph)."
- **California:** "Giant sequoias at night looking up the trunks, moonlight through the canopy, trunks lit warm amber, enormous scale, reverent."
- **LA City/County:** "Low-angle view of Los Angeles City Hall tower at night, monumental like a lighthouse, beam of light from the top, warm brass duotone."
- Alternates: "Theodore Roosevelt on horseback silhouetted against a prairie sunset, bronze-statue feel" · "Mount Rushmore at night under floodlights, stars above" · "Gold-rush miner panning a river in the Sierra foothills at dusk, gold flecks catching light, 1849 period clothing."

## 6. `archival` — archival print on paper
- **Federal:** "Albumen photograph, 1860s, the US Capitol dome under construction with cranes and scaffolding, sepia, foxing, mounted on cream card with a handwritten pencil caption, scanned archive object."
- **California:** "1850s daguerreotype-style photograph of gold miners at Sutter's Mill, sepia, worn edges, mounted on paper, archive scan."
- **LA City/County:** "1870s photograph of the Los Angeles Plaza and Plaza Church (Pueblo de Los Ángeles), dirt streets, adobe buildings, sepia print mounted on card."

## 7. `flags` — flags with fabric shading
- **Federal:** "The American flag (correct 50 stars, 13 stripes) waving slowly at night, lit by a single warm spotlight, deep black background, silk texture, photographic."
- **California:** "The California Bear Flag waving at night, warm spotlight, black background, fabric folds, photographic."
- **LA City/County:** "A tricolor flag in olive green, gold and red diagonal-zigzag stripes (City of Los Angeles flag) waving at night, warm spotlight, black background."

## 8. `arch` — arched doorway window
- **Federal:** "View through a tall stone arched doorway at night onto the National Mall: Washington Monument and Capitol dome lit warm in the distance, interior wall dark, brass-trimmed arch."
- **California:** "View through a tall arched window in a dark stone wall onto Yosemite Valley at moonrise: El Capitan, Half Dome, Bridalveil Fall, silver and amber light."
- **LA City/County:** "View through a tall arched doorway of the old Pueblo de Los Ángeles at night onto the Los Angeles skyline and City Hall tower, warm lanterns on Olvera Street."

## 9. `layered` — layered frames
- **Federal:** "Close detail of the Capitol dome's cast-iron ribs and Statue of Freedom at night, warm floodlight, dark sky, architectural photograph."
- **California:** "California State Capitol rotunda interior looking up into the dome, warm gold, symmetrical."
- **LA City/County:** "Sixth Street Viaduct arches over the concrete Los Angeles River at blue hour, lights reflecting in shallow water."

## 10. `typographic` — type with emblem
(No photography.) Optional texture: "Close macro of a worn leather book spine with gilt brass tooling and raised bands, black leather, warm light, no letters."

## Legal notes on seals and symbols
- **Great Seal of the United States:** 18 U.S.C. § 713 prohibits displaying the seal (or facsimile) in a way that conveys a false impression of government sponsorship or approval; State Department controls use. Not used.
- **Great Seal of the State of California:** Cal. Gov. Code § 402 makes it a misdemeanor to use a reproduction of the seal for commercial purposes or in a way that implies official endorsement. Not used.
- **LA City / LA County seals:** official insignia; the County seal has been the subject of litigation (cross removal, 2004; restoration struck down 2016). Avoid; not used.
- **Bear Flag / US flag / LA flag:** public-domain designs; US Flag Code (4 U.S.C. §§ 5–10) is advisory for civilians.
- **Iwo Jima:** Joe Rosenthal’s 1945 photo is AP-owned; use the Marine Corps War Memorial (photo under CC) or an AI interpretation instead.
- Emblems in the `emblem` and `typographic` branches are original artwork, deliberately unlike any official seal.
