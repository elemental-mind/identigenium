import type { IDSource } from '../identigenium.ts';

export class ConfigurableIDProvider implements IDSource
{
    #charSet: String[];
    #prefix: string;
    #charSetLength: number;
    #epoch = 0;
    
    public idStream: Generator<string, string, void>;

    get idEpoch()
    {
        return this.#epoch;
    }

    set idEpoch(newEpoch: number)
    {
        if (newEpoch < this.#epoch)
            console.warn("Setting ID epoch to less than current epoch. Risk of duplicate ID generation.");

        this.#epoch = newEpoch;
        this.idStream = this.#epochUpdatingIdGenerator(newEpoch);
    }

    constructor(permittedCharacters: string, startEpoch: number = 0, prefix: string = "")
    {
        this.#charSet = permittedCharacters.split("");
        this.#prefix = prefix;
        this.#charSetLength = this.#charSet.length;
        this.#epoch = startEpoch;
        this.idStream = this.#epochUpdatingIdGenerator(startEpoch);
    }

    *#epochUpdatingIdGenerator(startEpoch: number): Generator<string, string, void>
    {
        const idGenerator = this.#idGenerator(startEpoch);
        while (true)
        {
            this.#epoch++;
            yield idGenerator.next().value;
        }
    }

    *#idGenerator(startEpoch: number): Generator<string, string, void>
    {
        //We split into the current digit and the super digit portion. It's like splitting 123 into 12 and 3, where 12 is the super digit portion, that will be handled by the recursive call
        let currentDigitValueToRender = startEpoch % this.#charSetLength;
        let superDigitsValueToRender = Math.floor(startEpoch / this.#charSetLength) - 1;

        //If we don't have superdigits to render we can just start generation with one digit
        if (superDigitsValueToRender < 0)
        {
            while (currentDigitValueToRender < this.#charSetLength)
                yield this.#prefix + this.#charSet[currentDigitValueToRender++];
            currentDigitValueToRender = 0;
            superDigitsValueToRender = 0;
        }

        //At this point our current digits are exhausted or not sufficient, we thus need super digits to form the next ID
        const superDigitProvider = this.#idGenerator(superDigitsValueToRender);
        while (true)
        {
            const superRendered = superDigitProvider.next().value;
            while (currentDigitValueToRender < this.#charSetLength)
                yield superRendered + this.#charSet[currentDigitValueToRender++];
            currentDigitValueToRender = 0;
        }
    }

    generateID(): string
    {
        return this.idStream.next().value;
    }
}