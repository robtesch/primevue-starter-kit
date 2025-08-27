import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

/**
 * Noir theme preset based on the Aura theme.
 * @see {@link https://primevue.org/theming/styled/#noir|PrimeVue Noir Theme}
 *
 * Make adjustments to the theme by updating the "primary" color vars in app.css
 */
export const Noir = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{primary.50}',
            100: '{primary.100}',
            200: '{primary.200}',
            300: '{primary.300}',
            400: '{primary.400}',
            500: '{primary.500}',
            600: '{primary.600}',
            700: '{primary.700}',
            800: '{primary.800}',
            900: '{primary.900}',
            950: '{primary.950}',
        },
        colorScheme: {
            light: {
                primary: {
                    color: '{primary.950}',
                    inverseColor: '#ffffff',
                    hoverColor: '{primary.900}',
                    activeColor: '{primary.800}',
                },
                highlight: {
                    background: '{primary.950}',
                    focusBackground: '{primary.700}',
                    color: '#ffffff',
                    focusColor: '#ffffff',
                },
            },
            dark: {
                primary: {
                    color: '{primary.50}',
                    inverseColor: '{primary.950}',
                    hoverColor: '{primary.100}',
                    activeColor: '{primary.200}',
                },
                highlight: {
                    background: 'rgba(250, 250, 250, .16)',
                    focusBackground: 'rgba(250, 250, 250, .24)',
                    color: 'rgba(255,255,255,.87)',
                    focusColor: 'rgba(255,255,255,.87)',
                },
            },
        },
    },
});
