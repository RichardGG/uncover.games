## Logo

- Make logo
- Set favicons

## File structure

- Reuse menus ✅
- UI Store ✅

## Views

- Table ✅
  - Need to handle selected differently (not using index) ✅
- Filters ✅
- Game
  - Need to flesh out details?
  - Maybe just a basic table at least and a cover
- Covers ✅
  - Handle resize event (panel or window) ✅
    - Set "preferred size in px when changing row count", when resizing find closest to that size ✅
    - Consider changing row count to zoom buttons
- ~List?~ (redundant, just a simplified table)

## Playnite

- Export colours or low resolution cover as json
- Look into less jank virtual scrollers...

## Mobile

- Filters sheet ✅
- Add PWA manifest
- Landscape mobile
- Swipe to next game (maybe arrows on desktop?)

## Router

- Routes ✅
  - / default or maybe homescreen
  - /preset/{uuid} filter preset
  - /preset/{uuid}/game/{uuid} game
  - /game/{uuid} (quick search direct to game or missing preset? or fullscreen game?) ✅
    navigate /
    navigate /filter/1 (replace + push view)
    navigate /game/1 (replace + push game)
    navigate /filter/1/game/1 (replace + push view + push game)
    navigate /filter/custom (replace + push custom)
    navigate /filter/custom/game/1 (replace + push custom + push game)

custom filters don

open game (push)
switch game (replace)
close game (pop)

open view (pop game + push)
switch view (pop game + replace)
go home (pop game + pop view + replace?)

## Porting services from old project

## Nice to have

- Uninstall primeicons
- Mobile nav bar autohide
- User menu
- Adjust colours, eg gradient background
- Different fonts?

## Future Investigations

- Service workers for background sync
