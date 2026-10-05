import lemmatizer from "wink-lemmatizer";
import { localDictionary } from "../../data/dictionary";

export interface DictionaryEntry {
    word: string;
    definitions: LocalDefinition[];
}

interface LocalDefinition {
    partOfSpeech: string;
    meaning: string;
}

type LocalDictionary = Record<string, LocalDefinition[]>;

let dictionaryPromise: Promise<LocalDictionary> | undefined;

async function loadDictionary(): Promise<LocalDictionary> {
    if (!dictionaryPromise) {
        dictionaryPromise = (async () => {
            const url = `${rootURI}content/data/dictionary.json`;
            const response = await fetch(url);
            const data: unknown = await response.json();

            if (!data || typeof data !== "object" || Array.isArray(data)) {
                throw new Error("Incorrect data format");
            }

            return data as LocalDictionary;

        })()
        .catch( (error) => {
            dictionaryPromise = undefined;
            throw error;
        });
    }

    return dictionaryPromise;
}

const cache = new Map<string, DictionaryEntry>();

export async function getDefinition(word: string): Promise<DictionaryEntry> {

    const key = word.trim().toLowerCase();

    if (!key) {
        throw new Error (`Word not defined.`);
    }

    const dictionary = await loadDictionary();

    const definitions = dictionary[key];

    if (!definitions?.length){
        throw new Error(`Could not find a definition for ${word}`);
    }

    return {
        word: word,
        definitions: definitions,
    };
};