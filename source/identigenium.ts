/**
 * Interface for an ID source that provides unique identifiers.
 */
export interface IDSource
{
    /**
     * A generator that yields unique string IDs.
     * Can be used to iterate and generate IDs.
     * @example
     * // Using for-of loop
     * for (const id of idSource.idStream) {
     *   console.log(id);
     * }
     * @example
     * // Using next().value
     * const nextId = idSource.idStream.next().value;
     * console.log(nextId);
     */
    idStream: Generator<string, string, void>;

    /**
     * Generates and returns a new unique ID string.
     * @returns A unique identifier string
     */
    generateID(): string;
}

export { IncrementalIDProvider as IDProvider } from './generators/incremental.ts';
export { ConfigurableIDProvider as DynamicIDProvider } from './generators/configurable.ts';