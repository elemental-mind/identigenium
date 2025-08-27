import type { IDSource } from '../identigenium.ts';

export class IncrementalIDProvider implements IDSource
{
    #charSet: String[];
    #prefix: string;
    public idStream: Generator<string, string, void>;

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