
import fs from "node:fs";
import path from "node:path";

const inputDir = "./data/raw";
const outputDir = "./data/processed";

const partOfSpeechNames = {
  n: "noun",
  v: "verb",
  a: "adjective",
  s: "adjective",
  r: "adverb",
};

// STEP 1: Read the synset files

const synsets = new Map();

const synsetFiles = fs.readdirSync(inputDir).filter(file =>
  /^(noun|verb|adj|adv)\..*\.json$/.test(file)
);

for (const file of synsetFiles) {
  const data = JSON.parse(
    fs.readFileSync(path.join(inputDir, file), "utf8")
  );

  for (const [id, synset] of Object.entries(data)) {
    synsets.set(id, synset);
  }
}

console.log(`Loaded ${synsets.size} synsets.`);

// STEP 2: Read the word entry files

const dictionary = Object.create(null);
const entryFiles = fs.readdirSync(inputDir).filter(file =>
  /^entries-.*\.json$/.test(file)
);

for (const file of entryFiles) {
  const entries = JSON.parse(
    fs.readFileSync(path.join(inputDir, file), "utf8")
  );

  for (const [word, grammaticalForms] of Object.entries(entries)) {
    const key = word.trim().toLowerCase();

    if (!key) continue;

    dictionary[key] ??= [];

    // A word may appear as a noun, verb, adjective, etc.
    for (const form of Object.values(grammaticalForms)) {
      if (!Array.isArray(form?.sense)) continue;

      for (const sense of form.sense) {
        const synset = synsets.get(sense.synset);

        if (!synset) continue;

        // Your WordNet files store definitions as arrays.
        const definitions = synset.definition ?? [];

        for (const meaning of definitions) {
          if (typeof meaning !== "string") continue;

          const entry = {
            partOfSpeech:
              partOfSpeechNames[synset.partOfSpeech] ??
              synset.partOfSpeech ??
              "unknown",
            meaning,
          };

          // Avoid duplicate definitions for the same word.
          const alreadyExists = dictionary[key].some(
            existing =>
              existing.partOfSpeech === entry.partOfSpeech &&
              existing.meaning === entry.meaning
          );

          if (!alreadyExists) {
            dictionary[key].push(entry);
          }
        }
      }
    }

    // Don't retain entries without definitions.
    if (dictionary[key].length === 0) {
      delete dictionary[key];
    }
  }
}

// STEP 3: Write our simplified dictionary

fs.mkdirSync(outputDir, { recursive: true });

const outputPath = path.join(outputDir, "dictionary.json");

fs.writeFileSync(
  outputPath,
  JSON.stringify(dictionary),
  "utf8"
);

console.log(
  `Converted ${Object.keys(dictionary).length} words.`
);

console.log(`Saved dictionary to ${outputPath}`);
