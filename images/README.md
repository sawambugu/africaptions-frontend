# Images needed

Right now every image in the site is a plain `.svg` placeholder (dark box,
filename labeled on it) just so the layout and animations preview correctly.
My sandbox can't pull binaries from africaptions.com, so swap them for real
photos yourself:

1. Export/download your real photos as `.jpg`.
2. Drop them in this folder using the filenames below (e.g. `hero-bg.jpg`).
3. In `index.html`, change that one `src="images/hero-bg.svg"` to
   `src="images/hero-bg.jpg"` (same pattern for every image, a find-and-replace
   of `.svg` → `.jpg` across the file does it in one go).

| Filename         | Used for                          | Suggested source                                      |
|-------------------|------------------------------------|--------------------------------------------------------|
| hero-bg.jpg       | Full-bleed hero background         | A strong wide/landscape shoot still (16:9 or wider)     |
| reel-1.jpg        | "Connection happens" reel section  | Portrait-ish (4:5) documentary/event still              |
| reel-2.jpg        | "when storytelling" reel section   | Behind-the-scenes / crew-on-location shot                |
| reel-3.jpg        | "is authentic" reel section        | A strong portrait                                        |
| studio.jpg        | About/Studio section               | Crew or founder portrait                                  |
| gallery-1..8.jpg  | Portfolio grid                     | Best 8 frames — mix weddings/events/portraits             |

Africaptions already has all of this shot — their existing uploads folder
(wp-content/uploads/…) has hundreds of usable stills. Just download the
highest-res versions of ~15 favourites and rename/drop them here.

Keep files under ~400KB each (export at 1600–2000px wide, JPG quality ~75)
so the scroll animations stay smooth — the whole pitch depends on this
feeling fast.
