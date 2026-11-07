// Gera versões WebP otimizadas (800 e 1600 px) a partir das fotos originais em legacy/assets.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "legacy/assets";
const OUT = "public/img";

const MAP = {
  "hero-night": "e8d60f7e-a8df-4f62-9305-3a066fd287d5",
  "stadium-kick": "0a82a074-1dae-49da-9fb2-98538ded95ce",
  "coach-talk": "1d23c9fa-e3c4-4d52-b302-b98af480a72a",
  "study-desk": "51073dba-a871-467e-b7a6-bd6aaee5778d",
  "stadium-walk": "67f811ab-38c4-4056-9f9c-1bc36eda8eef",
  drills: "6b14cf5e-2fc5-45ad-9c5c-1b00a68a56c3",
  library: "92ce4a74-bd23-4cd9-9233-8a4937bcdca0",
  "luciano-boot": "e250bba1-1c79-4099-9e9b-cf71f998b29b",
  "dc-united": "47373580-9092-4174-8324-1acd7cf8ac2c",
  "team-luciano": "1551bb34-3303-4c1b-bc51-d7928c1cedce",
  "team-emily": "86ed529e-8750-424f-8e0c-3ef1fede056f",
  "team-ana": "ac7be7cd-0a4c-425a-adcf-7cc67191c277",
  logo: "e0262fe8-e3cb-490e-be26-80b148ad6180",
  "sponsor-1": "1915abc6-1477-4388-8224-a50c7d0adee1",
  "sponsor-2": "9cfbd298-319a-48bb-96f5-448fed61302c",
  "sponsor-3": "b3b060bf-7834-453d-9f73-fe74f27bb9a5",
  "sponsor-4": "ea560058-5374-44fe-9697-98ca61fbd585",
};

await mkdir(OUT, { recursive: true });
for (const [name, id] of Object.entries(MAP)) {
  const src = path.join(SRC, `${id}.jpg`);
  const meta = await sharp(src).metadata();
  for (const w of [800, 1600]) {
    const width = Math.min(w, meta.width);
    const info = await sharp(src).resize({ width }).webp({ quality: 74 }).toFile(path.join(OUT, `${name}-${w}.webp`));
    console.log(`${name}-${w}.webp`, info.width, "x", info.height, Math.round(info.size / 1024), "KB");
  }
}
