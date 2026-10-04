export interface DictionaryEntry {
    word: string;
    meaning: string;
    example?: string;
}

export function getDefinition(word: string): DictionaryEntry{
    return {
        word: word,
        meaning: "This is a temporary definition.",
        example: `An example using ${word}.`,
    }
};