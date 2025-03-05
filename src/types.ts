export type Book = {
  title: string;
  titleAlias?: string;
  year: string;
  place: string;
  author: string;
  authorAlias?: string;
  genre: string; // TODO: change to enum
  subgenre: string;
};
