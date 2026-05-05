/**
 * Pulls sauce page imagery from the Peckers Sanity dataset (public read API),
 * copies Peckers display fonts from peckers-master, and regenerates lib/sauce-lab-data.ts.
 */
import { copyFileSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const assetDir = join(root, "public/assets/sauce-lab");
const fontSrcDir = join(root, "peckers-master/app/fonts");

function slug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function extFromUrl(u) {
  const m = String(u).match(/\.(webp|png|jpe?g)(\?|$)/i);
  if (!m) return "webp";
  const e = m[1].toLowerCase();
  return e === "jpeg" ? "jpg" : e;
}

async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`GET ${url} → ${res.status}`);
  writeFileSync(dest, Buffer.from(await res.arrayBuffer()));
}

const query = `*[_type == "saucePage"]|order(_createdAt asc){_id,title,"bg":bgImage.asset->url,"bowl":sauceImage.asset->url,descLine1,descLine2,descLine3,cal,protein,carbs,fat}`;
const apiUrl =
  "https://3gu4dx3n.api.sanity.io/v2024-01-01/data/query/production?query=" +
  encodeURIComponent(query);

const { result } = await (await fetch(apiUrl)).json();
if (!Array.isArray(result) || result.length === 0) {
  console.error("No saucePage documents returned from Sanity.");
  process.exit(1);
}

mkdirSync(join(assetDir, "images"), { recursive: true });
mkdirSync(join(assetDir, "fonts"), { recursive: true });

const items = [];

for (const row of result) {
  const sl = slug(row.title);
  const bgExt = extFromUrl(row.bg);
  const bowlExt = extFromUrl(row.bowl);
  const bgRel = `images/${sl}-bg.${bgExt}`;
  const bowlRel = `images/${sl}-bowl.${bowlExt}`;
  console.log("→", row.title);
  await download(row.bg, join(assetDir, bgRel));
  await download(row.bowl, join(assetDir, bowlRel));
  items.push({
    id: row._id,
    title: row.title,
    descLine1: row.descLine1 ?? "",
    descLine2: row.descLine2 ?? "",
    descLine3: row.descLine3 ?? "",
    cal: row.cal != null ? String(row.cal).trim() : "",
    protein: row.protein != null ? String(row.protein).trim() : "",
    carbs: row.carbs != null ? String(row.carbs).trim() : "",
    fat: row.fat != null ? String(row.fat).trim() : "",
    bgSrc: `/assets/sauce-lab/${bgRel}`,
    bowlSrc: `/assets/sauce-lab/${bowlRel}`
  });
}

const ts = `export type SauceLabItem = {
  id: string;
  title: string;
  descLine1: string;
  descLine2: string;
  descLine3: string;
  cal: string;
  protein: string;
  carbs: string;
  fat: string;
  bgSrc: string;
  bowlSrc: string;
};

export const SAUCE_LAB_ITEMS: SauceLabItem[] = ${JSON.stringify(items, null, 2)};
`;

writeFileSync(join(root, "lib/sauce-lab-data.ts"), ts);
console.log("Wrote lib/sauce-lab-data.ts (" + items.length + " sauces).");

copyFileSync(
  join(fontSrcDir, "Supernett-Cn-Regular.woff2"),
  join(assetDir, "fonts/Supernett-Cn-Regular.woff2")
);
copyFileSync(
  join(fontSrcDir, "Supernett Cn Bold.otf"),
  join(assetDir, "fonts/Supernett-Cn-Bold.otf")
);
console.log("Copied display fonts into public/assets/sauce-lab/fonts.");
