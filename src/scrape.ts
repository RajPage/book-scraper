import { chromium } from "@playwright/test";

async function scrape() {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(
    "https://beckchris.com/literature-lists/the-big-literature-list-a-meta-meta-list/"
  );

  const bookElements = await page.$$("ol li ol li ol li");

  for (const bookElement of bookElements) {
    const fullText = await bookElement.innerText();
    console.log(fullText);
    const match = fullText.match(
      /^(.*?)(?:\s*\((.*?)\))?\s*–\s*(.*?)\s*\[(.*?)\]/
    );
    if (!match) {
      console.error("Failed to match:", fullText);
      continue;
    }
    const [, titleFull, yearPlace, authorFull, genre] = match;
    console.log({ titleFull, yearPlace, authorFull, genre });

    const yearPlaceParts = yearPlace.split(",");
    const year = yearPlaceParts[0].trim();
    const place = yearPlaceParts.length > 1 ? yearPlaceParts[1].trim() : "";
    console.log({ year, place });

    const authorParts = authorFull.split("(");
    const author = authorParts[0].trim();
    const authorAlias =
      authorParts.length > 1 ? authorParts[1].replace(")", "").trim() : "";
    console.log({ author, authorAlias });

    const titleParts = titleFull.split("(");
    const title = titleParts[0].trim();
    const titleAlias =
      titleParts.length > 1 ? titleParts[1].replace(")", "").trim() : "";
    console.log({ title, titleAlias });
  }

  await browser.close();
}

const main = async () => {
  await scrape();
};

main();
