'use strict';

/**
 * 支持的 type 有：
 *
 *   'build', 'ci', 'docs', 'feat', 'fix', 'perf',
 *   'refactor', 'revert', 'style', 'test'
 */

module.exports = {
    extends: ["@commitlint/config-conventional"],
    rules: {
        'body-leading-blank': [2, 'always'],
        'footer-leading-blank': [2, 'always'],
        'subject-case': [0],
        'scope-case': [0]
    }
};
