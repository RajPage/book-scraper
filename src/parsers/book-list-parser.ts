import { Book } from "../types";

export const BookListParser = () => {
  /*
  The book entries are in the following format
  - Antigone (442-441 BCE, Ancient Greece) – Sophocles [play]
  - Argonautica (Jason and the Argonauts) (c. 220 BCE, Ancient Greece) – Apollonius of Rhodes [epic poem]
  - The Panchatantra (c. 300-200 BCE, India) – Vishnu Sharma (attrib.) [fiction: linked stories]
  - Mid-Autumn Moon (c. 1101, China) – Su Shi (Su Dongpo) [poem]
  - Sonnets from the Portuguese 14 (“If thou must love me, let it be for nought”) (1845-1846, UK) – Elizabeth Barrett Browning [poem]
  - I heard a Fly buzz – when I died (c. 1886, US) – Emily Dickinson [poem]
  - Narcissus Speaks (Version 1: 1891, Version 2: 1920, France) – Paul Valéry [poem]

  Title ?(TitleAlias)? (Year, Place) - Author ?(AuthorAlias)? [genre: subgenre]
  */
  const parseBookEntry = (entry: string): Book | undefined => {
    const cleanedText = entry.trim();
    const bookRegex =
      /(?<titleYear>.+)(?:\,\s)(?<place>.+)(?:\)\s\–)\s(?<author>.+)\s(?<genre>\[.*\])/;
    const match = cleanedText.match(bookRegex);
    if (!match) {
      console.error("Failed to match:", cleanedText);
      return;
    }
    const [, titleYear, place, author, fullGenre] = match;
    const [title, titleAlias, year] = getTitleYear(titleYear);
    const [genre, subgenre] = getGenre(fullGenre);

    return {
      title,
      titleAlias,
      year,
      genre,
      subgenre,
      place,
      author,
    };
  };

  const getTitleYear = (titleYear: string): [string, string, string] => {
    let title = "",
      titleAlias = "",
      year = "";
    const titleYearFragments = titleYear.split("(");
    if (titleYearFragments.length === 3) {
      titleAlias = titleYearFragments[1].replace(")", "").trim();
      year = titleYearFragments[2].trim();
    } else if (titleYearFragments.length === 2) {
      year = titleYearFragments[1].trim();
    }
    title = titleYearFragments[0].trim();
    return [title, titleAlias, year];
  };

  const getGenre = (fullGenre: string): [string, string] => {
    let subgenre = "";
    const genreFragments = fullGenre
      .replace("[", "")
      .replace("]", "")
      .split(": "); // TODO: combine the replaces
    if (genreFragments.length > 1) subgenre = genreFragments[1];
    const genre = genreFragments[0];
    return [genre, subgenre];
  };

  const parseBookEntries = (entries: Array<string>): Array<Book> => {
    return entries.map((e) => parseBookEntry(e)).filter((b) => !!b);
  };

  return { parseBookEntries };
};
