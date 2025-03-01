# Uncover.Games (uncovergames)

Browse your games!

## Files overview

### Stores

- collectionsStore - Holds the data from Playnite, fetches from cacheService/driveStore
- driveStore - Holds the list of files from Google Drive
- googleAuthStore - Holds the API token used for Google APIs
- uiStore - Holds the current UI state, remembers via LocalStorage

### Services

- cacheService - Logic for reading from the cache
- driveService - Logic for fetching files from Google Drive
- filterService - Logic for filtering games
- formatService - Logic for formatting game fields
- sortService - Logic for sorting games
- youtubeService - Logic for fetching YouTube search results

### Types

- Game/Game - Definition of a Game
- Game/GameFields - Definition of the different fields accessible on a Game
- Game/GameFieldTypes - Definition of the different types of data GameFields can hold (also which is which)
- FilterTypes - Definitions of FilterPresets and Options
- LoadingStatusTypes - Definitions of loading states
- SortTypes - Definitions of SortOrders

## Install the dependencies

```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)

```bash
quasar dev
```

### Lint the files

```bash
yarn lint
# or
npm run lint
```

### Format the files

```bash
yarn format
# or
npm run format
```

### Build the app for production

```bash
quasar build
```
