import { IncrementalIDTests } from '../source/generators/incremental.spec.ts';
import { ConfigurableIDTests } from '../source/generators/configurable.spec.ts';


const incrementalGenerator = new IncrementalIDTests();
incrementalGenerator.shouldGenerateIDSequence();
incrementalGenerator.shouldGenerateIDWithPrefix();
incrementalGenerator.shouldProvideIterable();

const configurableGenerator = new ConfigurableIDTests();
configurableGenerator.shouldHaveConfigurableStartEpoch();
configurableGenerator.shouldInitializeEpochToZeroByDefault();
configurableGenerator.epochShouldBeAdjustable();
configurableGenerator.shouldGenerateCorrectDefaultStartId();
configurableGenerator.shouldGenerateCorrectCustomEpochId();
configurableGenerator.shouldUpdateEpochAfterIdGeneration();
configurableGenerator.shouldGenerateIdsWithPrefix();
configurableGenerator.shouldProvideIdIterable();
configurableGenerator.epochShouldBeAdjustableAfterGeneration();

console.log('All tests passed!');