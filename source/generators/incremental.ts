import type { IDSource } from '../identigenium.ts';

/**
 * An incremental ID provider that generates unique identifiers using a specified character set
 * and optional prefix. IDs are generated incrementally starting from the first character
 * in the set, then progressing through combinations of increasing length.
 */
export class IncrementalIDProvider implements IDSource
{
    #charSet: String[];
    #prefix: string;
    public idStream: Generator<string, string, void>;

    /**
     * Creates a new IncrementalIDProvider instance.
     * @param permittedCharacters - A string containing all allowed characters for ID generation. MUST be a string of unique characters; this is not checked.
     * @param prefix - An optional prefix to prepend to all generated IDs (default: "")
     */
    constructor(permittedCharacters: string, prefix: string = "")
    {
        this.#prefix = prefix;
        this.#charSet = permittedCharacters.split("");
        this.idStream = this.idGenerator();
    }

    protected *idGenerator()
    {
        //We first generate a sequence of base digits
        for (const baseDigit of this.#charSet)
            yield this.#prefix + baseDigit;

        //Then we append to the superdigits
        for (const superDigits of this.idGenerator())
            for (const baseDigit of this.#charSet)
                yield superDigits + baseDigit;
    }

    generateID()
    {
        return this.idStream.next().value;
    }
}