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
        browser: 'chrome',
        baseUrl: 'http://localhost:4200',
    },
});
