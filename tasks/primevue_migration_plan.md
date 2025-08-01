# Plan to Migrate UI Components from Reka UI to PrimeVue

This document outlines the steps required to replace the current `reka-ui` based components located in `resources/js/components/ui` with PrimeVue equivalents.

## 1. Install PrimeVue

1. Install the PrimeVue packages using **pnpm**:
   ```bash
   pnpm add primevue @primeuix/themes
   ```
2. Review the PrimeVue documentation for Vite integration and choose a theme (for example `Aura`).
3. Import PrimeVue in `resources/js/app.ts` and register the plugin and theme:
   ```ts
   import { createApp } from 'vue'
   import PrimeVue from 'primevue/config'
   import Aura from '@primeuix/themes/aura'

   const app = createApp(App)
   app.use(PrimeVue, {
       theme: {
           preset: Aura
       }
   })
   ```
4. Configure Font Awesome for icons instead of `primeicons`.

## 2. Replace Existing Components

1. For each component inside `resources/js/components/ui`, locate where it is imported across the project.
   - Examples include `Avatar.vue`, `Button.vue`, `Dialog.vue`, etc.
2. Replace these imports with the corresponding PrimeVue components.
   - Map component props and events carefully to the PrimeVue API.
   - Update any styling or class usage to match PrimeVue expectations (PrimeFlex classes may help).
3. Adjust templates and scripts in the consuming components to use the new PrimeVue elements.
4. Remove unused props or helpers that were specific to `reka-ui`.

## 3. Clean Up Custom Components

1. After replacing every usage, delete all component files under `resources/js/components/ui`.
2. Ensure that no remaining imports reference the deleted files (search the repo to confirm).

## 4. Uninstall Reka UI

1. Remove the dependency from `package.json`:
   ```bash
   pnpm remove reka-ui
   ```
2. Review the codebase for any remaining imports from `reka-ui` and replace them with PrimeVue features or local implementations.

## 5. Test the Application

1. Run `pnpm run lint` and `pnpm run build` to verify that the frontend compiles successfully.
2. Run backend tests using `composer test`.
3. Manually test the UI to ensure all components render and behave correctly with PrimeVue.

