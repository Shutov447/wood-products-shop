import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        ...nxE2EPreset(__filename, {
            cypressDir: 'src',
            webServerCommands: {
                default: 'nx run wood-products-shop:serve:development',
                production: 'nx run wood-products-shop:serve:production',
            },
            ciWebServerCommand: 'nx run wood-products-shop:serve-static',
        }),
        setupNodeEvents(on, config) {
            require('@cypress/code-coverage/task')(on, config);
            // include any other plugin code...

            // It's IMPORTANT to return the config object
            // with any changed environment variables
            return config;
        },
        browser: 'chrome',
        baseUrl: 'http://localhost:4200',
    },
    viewportWidth: 1600,
    viewportHeight: 1000,
});
