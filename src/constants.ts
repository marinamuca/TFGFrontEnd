export const ROOM_PATH = "/room";
export const LOGIN_PATH = "/login";
export const REGISTER_PATH = "/register";
export const INDEX_PATH = "/";
export const PROFILE_PATH = "/profile";
export const EXHIBITION_PATH = "/exhibition";

export const TILE_SIZE = 2;
export const NO_POSITION = -1;
export const API_DATE_FORMAT = "YYYY-MM-DD";

export const EMPTY = "";

export const TOAST_TIMEOUT = 6000;

export enum Languages {
  SPANISH = "es",
  ENGLISH = "en",
}

export enum Namespace {
  COMMON = "common",
}

export function capitalize(str: string){
  return str.charAt(0).toUpperCase() + str.slice(1);
}
