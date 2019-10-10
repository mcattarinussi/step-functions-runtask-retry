const fs = require('fs');

const { handler } = require('../src/process-error/handler');

const loadErrorEvent = errorName => fs.readFileSync(`./test/data/error-events/${errorName}.json`);

describe('when the ecs task returns a non-zero exit code', () => {
    describe.each([
        [1, {
            type: 'RETRIABLE',
            retryCount: 1,
            waitSeconds: 0,
        }],
        [3, {
            type: 'FATAL',
            retryCount: 1,
            waitSeconds: 0,
        }],
        [4, {
            type: 'TEMPORARY',
            retryCount: 1,
            waitSeconds: 60,
        }]
    ])(
        'when exit code is %s',
        (exitCode, expectedErrorState) => {
            it('returns the proper error state', async () => {
                const errorEvent = JSON.parse(loadErrorEvent(`failed-task-exit-code-${exitCode}`));
                await expect(handler(errorEvent)).resolves.toEqual(expectedErrorState);
            });
        }
    );
});
