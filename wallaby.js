module.exports = function(wallaby) {
    return {
        files: ['src/**/*.js', '!src/**/sliding-window/*.*', '!src/**/*.test.js'],
        tests: ['src/**/*.test.js', '!src/**/sliding-window/*.*'],

        env: {
            type: 'node',
            runner: 'node'
        },

        testFramework: 'jest'

        // debug: true
    };
};
