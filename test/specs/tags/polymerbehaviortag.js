/* global jsdoc */
describe('@polymerBehavior tag', () => {
    const env = require('jsdoc/env');
    const logger = require('@jsdoc/logger');

    const allowUnknownTags = Boolean(env.conf.tags.allowUnknownTags);

    beforeEach(() => {
        env.conf.tags.allowUnknownTags = false;
        spyOn(logger, 'error');
    });

    afterEach(() => {
        jsdoc.restoreTagDictionary();
        env.conf.tags.allowUnknownTags = allowUnknownTags;
    });

    describe('JSDoc tags', () => {
        beforeEach(() => {
            jsdoc.replaceTagDictionary('jsdoc');
        });

        it('should not recognize the @polymerBehavior tag', () => {
            jsdoc.getDocSetFromFile('test/fixtures/polymerbehaviortag.js');

            expect(logger.error).toHaveBeenCalled();
        });
    });

    describe('Closure Compiler tags', () => {
        beforeEach(() => {
            jsdoc.replaceTagDictionary('closure');
        });

        it('should recognize the @polymerBehavior tag', () => {
            jsdoc.getDocSetFromFile('test/fixtures/polymerbehaviortag.js');

            expect(logger.error).not.toHaveBeenCalled();
        });
    });
});
