import { Book } from "./types";

export const analyzeBooks = (books: Array<Book>) => {
  const genreMap = new Map<string, Set<string>>()
  const placesSet = new Set<string>()

  books.forEach((b)=> {
    b.places.forEach(p => placesSet.add(p))
    
    if (!genreMap.has(b.genre)) {
      genreMap.set(b.genre, new Set())
    }

    if (b.subgenre) {
      genreMap.get(b.genre)!.add(b.subgenre)
    }
  })

  return {genreMap, placesSet}
}