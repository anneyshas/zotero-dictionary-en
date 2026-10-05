# Dictionary EN for Zotero

Dictionary EN is an offline English dictionary plugin for Zotero's PDF reader.

It lets you select a word while reading a PDF, look up its definition directly inside Zotero, and browse through multiple WordNet senses without relying on an external API.

The plugin is designed to keep dictionary lookup lightweight and available even when internet access is unreliable.

## Features

- Look up selected words directly inside Zotero's PDF reader
- Fully offline dictionary lookup
- Definitions derived from Open English WordNet
- Multiple definitions for words with more than one sense
- Previous and next controls for browsing definitions
- Part-of-speech information
- Local dictionary data, with no API key required
- No external dictionary service required during normal use

## How it works

When a word is selected in Zotero's PDF reader, Dictionary EN adds a **Define** option to the text-selection interface.

After selecting **Define**, the plugin:

1. normalises the selected word
2. searches the bundled local dictionary
3. retrieves all matching definitions
4. displays the first definition
5. allows the user to move between additional definitions using navigation controls

The dictionary is loaded locally when first needed and reused during the Zotero session.

## Installation

### From a release

1. Download the latest `.xpi` file from the GitHub Releases page.
2. Open Zotero.
3. Go to **Tools → Plugins**.
4. Drag the downloaded `.xpi` file into the Plugins window.
5. Restart Zotero if prompted.

### Using the plugin

1. Open a PDF in Zotero.
2. Select a word.
3. Click **Define [word]** in the text-selection popup.
4. Use the arrow controls to move between available definitions.

## Development

This project is written in TypeScript and is based on the Zotero Plugin Template.

### Install dependencies

```bash
npm install
```

### Start the development environment

```bash
npm start
```

This launches the plugin in development mode and supports hot reloading while working on the plugin.

### Build the plugin

```bash
npm run build
```

The production build is generated under the scaffold build directory.

## Dictionary data

Dictionary EN uses data derived from **Open English WordNet**.

Open English WordNet is developed by the Open English WordNet community and is derived from Princeton WordNet.

The original Open English WordNet data has been modified for use in this plugin. The source JSON files are processed into a simplified local dictionary format optimised for offline lookup inside Zotero.

The transformation:

- resolves WordNet entry-to-synset references
- extracts definitions and parts of speech
- groups multiple senses under each word
- converts the original dataset into a simplified JSON structure used by the plugin

The processed dictionary is bundled with the plugin so dictionary lookup does not require an internet connection.

Open English WordNet:

https://en-word.net/

Open English WordNet source repository:

https://github.com/globalwordnet/english-wordnet

Open English WordNet is licensed under the Creative Commons Attribution 4.0 International License.

https://creativecommons.org/licenses/by/4.0/

The underlying Princeton WordNet material is also subject to the Princeton WordNet licence.

Relevant licence files are included in:

```text
licenses/
├── OPEN_ENGLISH_WORDNET_LICENSE.md
└── WNDB_License.txt
```

## Dictionary processing

The original WordNet JSON release is not required at runtime.

Raw development data can be stored under:

```text
data/raw/
```

The conversion script is located at:

```text
scripts/convert-dictionary.mjs
```

It produces the simplified dictionary used by the plugin.

The bundled runtime dictionary is located at:

```text
addon/content/data/dictionary.json
```

The raw WordNet dataset is intentionally not distributed with the plugin repository when unnecessary.

## Project structure

```text
zotero-dictionary-en/
├── addon/
│   └── content/
│       └── data/
│           └── dictionary.json
│
├── data/
│   ├── raw/
│   └── processed/
│       └── dictionary.json
│
├── licenses/
│   ├── OPEN_ENGLISH_WORDNET_LICENSE.md
│   └── WNDB_License.txt
│   └── LICENSE
│
├── scripts/
│   └── convert-dictionary.mjs
│
├── src/
│   └── modules/
│       ├── dictionary.ts
│       └── examples.ts
│
├── package.json
└── README.md
```

## Acknowledgements

This plugin was developed using the **Zotero Plugin Template** by windingwind.

The template provides the TypeScript development environment, Zotero plugin scaffolding, build tooling, development server, and release infrastructure used by this project.

Zotero Plugin Template:

https://github.com/windingwind/zotero-plugin-template

[![Using Zotero Plugin Template](https://img.shields.io/badge/Using-Zotero%20Plugin%20Template-blue?style=flat-square&logo=github)](https://github.com/windingwind/zotero-plugin-template)

Dictionary data is derived from Open English WordNet and Princeton WordNet. See the **Dictionary data** and **Licences** sections for attribution details.

## Licences

This repository contains material covered by multiple licences.

### Plugin source code

The plugin source code is distributed subject to the licence provided in this repository.

Because this project is derived from the Zotero Plugin Template, the template's applicable licence terms should also be retained where required.

### Open English WordNet

Open English WordNet is licensed under the Creative Commons Attribution 4.0 International License.

The dictionary data used by Dictionary EN has been modified and restructured from the original Open English WordNet release.

See:

```text
licenses/OPEN_ENGLISH_WORDNET_LICENSE.md
```

### Princeton WordNet

The underlying Princeton WordNet material remains subject to the Princeton WordNet licence.

See:

```text
licenses/WNDB_License.txt
```

## Privacy

Dictionary EN performs dictionary lookup locally using bundled dictionary data.

Normal dictionary lookups do not need to send the selected word to an external dictionary API.

## Status

Dictionary EN is an early-stage plugin and may continue to change as the interface, word normalisation, morphology support, and dictionary coverage are improved.

## Planned improvements

Possible future improvements include:

- lemmatisation and morphological normalisation
- improved handling of inflected forms
- better ranking of definitions
- richer part-of-speech display
- pronunciation support
- improved styling for Zotero light and dark themes
- keyboard navigation between definitions

## Contributing

Contributions, bug reports, and suggestions are welcome.

Please use the GitHub Issues page for bugs or feature requests.

## Author

Anneysha Sarkar