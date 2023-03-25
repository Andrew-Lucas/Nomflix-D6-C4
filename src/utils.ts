import { atom } from "recoil"

export function makeImage(
  id: string,
  resolution?: 'w200' | 'w300' | 'w400' | 'w500'
) {
  return `https://image.tmdb.org/t/p/${resolution || 'original'}${id}`
}

export const SearchedKeyword = atom({
  key: "Keyword",
  default: ""
})