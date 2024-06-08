module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/?(*.)+(spec|test).ts'],
    setupFiles: ['<rootDir>/tests/setup.ts']
}
