export interface IDSource
{
    idStream: Generator<string, string, void>;
    generateID(): string;
}

export { IncrementalIDProvider as IDProvider } from './generators/incremental.ts';
export { ConfigurableIDProvider as DynamicIDProvider } from './generators/configurable.ts';