import { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest', // Use ts-jest to handle TypeScript files
    testEnvironment: 'node', // Use Node.js environment for tests
    moduleFileExtensions: ['ts', 'js', 'json'],
    testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'], // Match test files
    transform: {
        '^.+\\.ts$': 'ts-jest', // Transform TypeScript files
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1', // Handle path aliases, if you use them
    },
    transformIgnorePatterns: [
        '/node_modules/', // Ignore transformations in node_modules
    ],
};

export default config;
