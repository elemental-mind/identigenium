import { ConfigurableIDProvider } from './configurable.ts';
import * as assert from 'assert';

export class ConfigurableIDTests
{
    shouldHaveConfigurableStartEpoch()
    {
        const provider = new ConfigurableIDProvider('abc', 5, 'pre');
        assert.equal(provider.idCounter, 5);
    }

    shouldInitializeEpochToZeroByDefault()
    {
        const provider = new ConfigurableIDProvider('123');
        assert.equal(provider.idCounter, 0);
        
    }

    shouldGenerateCorrectDefaultStartId()
    {
        const provider = new ConfigurableIDProvider('ab', 0);
        assert.equal(provider.generateID(), 'a');
        assert.equal(provider.generateID(), 'b');
        assert.equal(provider.generateID(), 'aa');
    }

    shouldGenerateCorrectCustomEpochId()
    {
        const provider = new ConfigurableIDProvider('ab', 2);
        assert.equal(provider.generateID(), 'aa');
        assert.equal(provider.generateID(), 'ab');
        assert.equal(provider.generateID(), 'ba');
    }

    shouldUpdateEpochAfterIdGeneration()
    {
        const provider = new ConfigurableIDProvider('ab', 0);
        assert.equal(provider.idCounter, 0);
        provider.generateID();
        assert.equal(provider.idCounter, 1);
        provider.generateID();
        assert.equal(provider.idCounter, 2);
    }

    shouldGenerateIdsWithPrefix()
    {
        const provider = new ConfigurableIDProvider('12', 0, 'pre');
        assert.equal(provider.generateID(), 'pre1');
        assert.equal(provider.generateID(), 'pre2');
        assert.equal(provider.generateID(), 'pre11');
    }

    shouldProvideIdIterable()
    {
        const provider = new ConfigurableIDProvider('xy', 0);
        const stream = provider.idStream;
        assert.equal(stream.next().value, 'x');
        assert.equal(stream.next().value, 'y');
        assert.equal(stream.next().value, 'xx');
        assert.equal(stream.next().value, 'xy');
    }

    epochShouldBeAdjustable()
    {
        const provider = new ConfigurableIDProvider('ab', 0);
        provider.idCounter = 3;
        assert.equal(provider.idCounter, 3);
    }

    epochShouldBeAdjustableAfterGeneration()
    {
        const provider = new ConfigurableIDProvider('ab', 0);
        provider.generateID();
        provider.generateID();
        assert.equal(provider.idCounter, 2);
        provider.idCounter = 0;
        assert.equal(provider.idCounter, 0);
        assert.equal(provider.generateID(), 'a');
    }
}
