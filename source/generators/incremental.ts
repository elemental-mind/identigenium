import type { IDSource } from '../identigenium.ts';

export class IncrementalIDProvider implements IDSource
{
    protected charSet: String[];
    public idStream: Generator<string, string, void>;

    constructor(permittedCharacters: string, public readonly prefix: string = "")
    {
        this.charSet = permittedCharacters.split("");
        this.idStream = this.idGenerator();
    }

    protected *idGenerator()
    {
        //We first generate a sequence of base digits
        for (const baseDigit of this.charSet)
            yield this.prefix + baseDigit;

        //Then we append to the superdigits
        for (const superDigits of this.idGenerator())
            for (const baseDigit of this.charSet)
                yield superDigits + baseDigit;
    }

    generateID()
    {
        return this.idStream.next().value;
    }
}