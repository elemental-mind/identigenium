import * as assert from 'assert';
import { IncrementalIDProvider } from './incremental.ts';


export class IncrementalIDTests
{
    shouldGenerateIDSequence()
    {
        const provider = new IncrementalIDProvider('ab');
        assert.equal(provider.generateID(), 'a');
        assert.equal(provider.generateID(), 'b');
        assert.equal(provider.generateID(), 'aa');
        assert.equal(provider.generateID(), 'ab');
        assert.equal(provider.generateID(), 'ba');
        assert.equal(provider.generateID(), 'bb');
        assert.equal(provider.generateID(), 'aaa');
    }

    shouldGenerateIDWithPrefix()
    {
        const provider = new IncrementalIDProvider('12', 'pre');
        assert.equal(provider.generateID(), 'pre1');
        assert.equal(provider.generateID(), 'pre2');
        assert.equal(provider.generateID(), 'pre11');
        assert.equal(provider.generateID(), 'pre12');
    }

    shouldProvideIterable()
    {
        const provider = new IncrementalIDProvider('xy');
        const stream = provider.idStream;
        assert.equal(stream.next().value, 'x');
        assert.equal(stream.next().value, 'y');
        assert.equal(stream.next().value, 'xx');
        assert.equal(stream.next().value, 'xy');
    }
}
