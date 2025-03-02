import { map } from 'lodash';
import { Game } from '../types/Game/Game';
import { GameField } from '../types/Game/GameField';
import { Tag } from '../types/Game/GameFieldTypes';
import { format } from 'quasar';

export type GameValueTypeMap = {
  [K in GameField]:
    | 'text'
    | 'number'
    | 'bool'
    | 'object'
    | 'collection'
    | 'date'
    | 'duration'
    | 'image'
    | 'size'
    | 'score'
    | 'releasedate'
    | 'unsupported';
};

export const GameValueTypes: GameValueTypeMap = {
  Description: 'text',
  Notes: 'text',
  Name: 'text',

  LastActivity: 'date',
  RecentActivity: 'date',
  Added: 'date',
  Modified: 'date',

  Playtime: 'duration',

  InstallDirectory: 'text',
  SortingName: 'text',

  PlayCount: 'number',
  ReleaseYear: 'number',

  InstallSize: 'size',

  Icon: 'image',
  CoverImage: 'image',
  BackgroundImage: 'image',

  Links: 'collection',

  Genres: 'collection',
  Developers: 'collection',
  Publishers: 'collection',
  Tags: 'collection',
  Features: 'collection',
  Categories: 'collection',
  Platforms: 'collection',
  Series: 'collection',
  AgeRatings: 'collection',
  Regions: 'collection',
  Roms: 'collection',

  Source: 'object',
  CompletionStatus: 'object',

  IsCustomGame: 'bool',
  IsInstalling: 'bool',
  IsUninstalling: 'bool',
  IsLaunching: 'bool',
  IsRunning: 'bool',
  IsInstalled: 'bool',
  EnableSystemHdr: 'bool',
  UseGlobalPostScript: 'bool',
  UseGlobalPreScript: 'bool',
  UseGlobalGameStartedScript: 'bool',
  Hidden: 'bool',
  Favorite: 'bool',

  UserScore: 'score',
  CriticScore: 'score',
  CommunityScore: 'score',

  PreScript: 'unsupported',
  PostScript: 'unsupported',
  GameStartedScript: 'unsupported',

  ReleaseDate: 'releasedate',

  GameId: 'unsupported',
  PluginId: 'unsupported',
  SourceId: 'unsupported',
  CompletionStatusId: 'unsupported',
  Id: 'unsupported',

  GenreIds: 'unsupported',
  PlatformIds: 'unsupported',
  PublisherIds: 'unsupported',
  DeveloperIds: 'unsupported',
  CategoryIds: 'unsupported',
  TagIds: 'unsupported',
  FeatureIds: 'unsupported',
  SeriesIds: 'unsupported',
  AgeRatingIds: 'unsupported',
  RegionIds: 'unsupported',

  UserScoreRating: 'unsupported',
  CommunityScoreRating: 'unsupported',
  CriticScoreRating: 'unsupported',
  UserScoreGroup: 'unsupported',
  CommunityScoreGroup: 'unsupported',
  CriticScoreGroup: 'unsupported',

  IncludeLibraryPluginAction: 'unsupported',
  GameActions: 'unsupported',
  OverrideInstallState: 'unsupported',
  LastSizeScanDate: 'unsupported',
  Version: 'unsupported',
  Manual: 'unsupported',
  LastActivitySegment: 'unsupported',
  RecentActivitySegment: 'unsupported',
  AddedSegment: 'unsupported',
  ModifiedSegment: 'unsupported',
  PlaytimeCategory: 'unsupported',
  InstallSizeGroup: 'unsupported',
  InstallationStatus: 'unsupported',
};

export const formatGameField = (game: Game, field: GameField): string => {
  if (GameValueTypes[field] === 'text' && typeof game[field] === 'string') {
    return game[field] || '';
  }

  if (GameValueTypes[field] === 'collection' && Array.isArray(game[field])) {
    return map(game[field], 'Name').join(', ');
  }

  if (GameValueTypes[field] === 'object' && typeof game[field] === 'object') {
    const fieldObject = game[field] as Tag;
    return fieldObject?.Name || '';
  }

  if (GameValueTypes[field] === 'date' && typeof game[field] === 'string') {
    return game[field];
  }

  if (GameValueTypes[field] === 'duration' && typeof game[field] === 'number') {
    const seconds = game[field];
    if (seconds < 60) {
      return `${seconds} seconds`;
    }
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) {
      return `${minutes} minutes`;
    }
    const hours = Math.floor(minutes / 60);
    return `${hours}h ${minutes % 60}m`;
  }

  if (GameValueTypes[field] === 'size' && typeof game[field] === 'number') {
    return format.humanStorageSize(game[field]);
  }

  if (GameValueTypes[field] === 'bool') {
    return game[field] ? 'Yes' : 'No';
  }

  if (GameValueTypes[field] === 'score' || GameValueTypes[field] === 'number') {
    return (game[field] || '') + '';
  }

  if (
    GameValueTypes[field] === 'releasedate' &&
    typeof game[field] === 'object' &&
    game[field] !== null &&
    'ReleaseDate' in game[field]
  ) {
    return game[field].ReleaseDate + '';
  }

  return '';
};
