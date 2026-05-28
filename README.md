# Uncover.Games

Uncover.Games lets you view your Playnite game library from anywhere by loading JSON exports and cover images synced to Google Drive.

The Playnite plugin `UncoverGamesExporter` (used alongside this project) exports your Playnite library, saved filters, and cover images to Google Drive. This web app loads those exports so you can browse, search, and apply your saved filters remotely.

## Screenshots

![Desktop overview](images/Uncover.Games%20desktop%20overview.png) 

| Filters| Grouping | Saved filters | Sorting |
| --- | --- | --- | --- |
| ![Filters](images/Uncover.Games%20desktop%20features%20filters.png) | ![Grouping](images/Uncover.Games%20desktop%20features%20grouping.png) | ![Saved filters](images/Uncover.Games%20desktop%20features%20saved%20filters.png) | ![Sorting](images/Uncover.Games%20desktop%20features%20sorting.png) |

| Mobile overview | Mobile details | Mobile Preview |
| --- | --- | --- |
| ![Mobile overview](images/Uncover.Games%20mobile%20overview.png) | ![Mobile details](images/Uncover.Games%20mobile%20details.png) | ![Preview](images/Uncover.Games%20mobile%20preview.png) |

## Features

- View your Playnite library (titles, metadata, playtime, etc.)
- Includes your cover images synced from Playnite
- Apply and use your saved filters and sorts exported by the Playnite plugin
- Sign in with Google to load exports stored on Google Drive

## Requirements

- A Google account
- Free storage on Google Drive

## Usage

1. Sign in to Google via UncoverGamesExporter plugin in Playnite and sync library
2. Open Uncover.Games website and sign in to Google

Initial load may take a bit longer, assets will be cached in your browser for better performance

## Local Development

TODO add instructions for creating Google Drive OAuth credentials

Install and run locally

```bash
npm install
npm run dev
```

Build for production

```bash
npm run build
```