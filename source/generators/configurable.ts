import type { IDSource } from '../identigenium.ts';

export class ConfigurableIDProvider implements IDSource
{
    #charSet: String[];
    #prefix: string;
    #charSetLength: number;
    #counter = 0;

    public idStream: Generator<string, string, void>;

    get idCounter()
    {
        return this.#counter;
    }

    set idCounter(newEpoch: number)
    {
        if (newEpoch < this.#counter)
            console.warn("Setting ID counter to less than current count. Risk of duplicate ID generation.");

        this.#counter = newEpoch;
        this.idStream = this.#epochUpdatingIdGenerator(newEpoch);
    }

    constructor(permittedCharacters: string, startWithCounter: number = 0, prefix: string = "")
    {
        this.#charSet = permittedCharacters.split("");
        this.#prefix = prefix;
        this.#charSetLength = this.#charSet.length;
        this.#counter = startWithCounter;
        this.idStream = this.#epochUpdatingIdGenerator(startWithCounter);
    }

    *#epochUpdatingIdGenerator(startEpoch: number): Generator<string, string, void>
    {
        const idGenerator = this.#idGenerator(startEpoch);
        while (true)
        {
            this.#counter++;
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