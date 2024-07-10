/* eslint-disable */
import type { Config } from 'jest';

const config: Config = {
    displayName: 'wood-products-shop',
    preset: './jest.preset.js',
    setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
    coverageDirectory: './coverage/wood-products-shop',
    transform: {
        '^.+\\.(ts|mjs|js|html)$': [
            'jest-preset-angular',
            {
                tsconfig: '<rootDir>/tsconfig.spec.json',
                stringifyContentPathRegex: '\\.(html|svg)$',
            },
        ],
    },
    transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
    snapshotSerializers: [
        'jest-preset-angular/build/serializers/no-ng-attributes',
        'jest-preset-angular/build/serializers/ng-snapshot',
        'jest-preset-angular/build/serializers/html-comment',
    ],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.[jt]s?(x)',
        '<rootDir>/src/**/*(*.)@(spec|test).[jt]s?(x)',
    ],
    collectCoverage: true,
    clearMocks: true,
    moduleNameMapper: {
        '@app(.*)': ['<rootDir>/src/app/$1'],
        '@app/core(.*)': ['<rootDir>/src/app/core/$1'],
        '@pages(.*)': ['<rootDir>/src/pages/$1'],
        '@widgets(.*)': ['<rootDir>/src/widgets/$1'],
        '@entities(.*)': ['<rootDir>/src/entities/$1'],
        '@features(.*)': ['<rootDir>/src/features/$1'],
        '@shared(.*)': ['<rootDir>/src/shared/$1'],
        '@assets(.*)': ['<rootDir>/src/assets/$1'],
    },
};

export default config;
