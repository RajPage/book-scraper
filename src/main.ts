import { chromium } from "@playwright/test";
import { BookListParser } from "./parsers/book-list-parser";

const scrape = async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(
    "https://beckchris.com/literature-lists/the-big-literature-list-a-meta-meta-list/"
  );

  const bookElements = await page.$$("ol li ol li ol li");
  const { parseBookEntries } = BookListParser();
  const bookEntries = await Promise.all(bookElements.map((b) => b.innerText()));
  const books = parseBookEntries(bookEntries);
  console.log("Books scraped:", books.length);
  // Around 50 books were not scraped by the regex.
};

const main = async () => {
  await scrape();
};

main();
