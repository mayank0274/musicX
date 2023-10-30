export interface RootObject {
  data: RELATEDSONGS[];
}

export interface RELATEDSONGS {
  attributes: Attributes;
  id: string;
  type: Type;
}

export interface Attributes {
  albumName: string;
  artistName: string;
  artwork: Artwork;
  audioLocale: AudioLocale;
  audioTraits: AudioTrait[];
  composerName?: string;
  contentRating?: string;
  discNumber: number;
  durationInMillis: number;
  editorialNotes?: EditorialNotes;
  genreNames: string[];
  hasCredits: boolean;
  hasLyrics: boolean;
  hasTimeSyncedLyrics: boolean;
  isAppleDigitalMaster: boolean;
  isMasteredForItunes: boolean;
  isVocalAttenuationAllowed: boolean;
  isrc: string;
  name: string;
  playParams: PlayParams;
  previews: Preview[];
  releaseDate: Date;
  trackNumber: number;
  url: string;
}

export interface Artwork {
  bgColor: string;
  hasP3: boolean;
  height: number;
  textColor1: string;
  textColor2: string;
  textColor3: string;
  textColor4: string;
  url: string;
  width: number;
}

export enum AudioLocale {
  EnUS = "en-US",
  Zu = "zu",
}

export enum AudioTrait {
  Atmos = "atmos",
  Lossless = "lossless",
  LossyStereo = "lossy-stereo",
  Spatial = "spatial",
}

export interface EditorialNotes {
  short: string;
  tagline?: string;
}

export interface PlayParams {
  id: string;
  kind: Kind;
}

export enum Kind {
  Song = "song",
}

export interface Preview {
  url: string;
}

export enum Type {
  Songs = "songs",
}
