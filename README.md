# Laravel + Vue + PrimeVue Starter Kit

## Introduction

This is a starter kit for Laravel that uses Vue.js and PrimeVue. It is a fork of the official [Laravel Vue Starter Kit](https://github.com/laravel/vue-starter-kit).

The key difference is that this starter kit uses [PrimeVue](https://primevue.org/) as the component library instead of `shadcn-vue`.

**Removed Customization**

Please note that this starter kit has removed some of the layout and theme customization options available in the original. It is configured to use a sidebar layout by default.

Our Vue starter kit provides a robust, modern starting point for building Laravel applications with a Vue frontend using [Inertia](https://inertiajs.com).

Inertia allows you to build modern, single-page Vue applications using classic server-side routing and controllers. This lets you enjoy the frontend power of Vue combined with the incredible backend productivity of Laravel and lightning-fast Vite compilation.

This Vue starter kit utilizes Vue 3 and the Composition API, TypeScript, Tailwind, and the [PrimeVue](https://primevue.org/) component library.

## Getting Started

### Frontend Customization

This starter kit is designed to be easily customizable. Here are some of the ways you can tailor it to your needs:

#### Theming

The project uses a custom PrimeVue theme called "Noir," which is a modified version of the "Aura" theme. You can customize the color scheme by editing `resources/js/theme.ts`.

The `useAppearance` composable (`resources/js/composables/useAppearance.ts`) handles switching between light and dark modes, and storing the user's preference in local storage. You can modify this file to change how the theme is managed.

For more information on PrimeVue theming, see the [official documentation](https://primevue.org/theming/).

#### Sidebar

The `useSidebar` composable (`resources/js/composables/useSidebar.ts`) manages the sidebar's state (open/closed) and provides a keyboard shortcut (Ctrl+B) to toggle it. You can adjust the sidebar's width and other properties in this file.

#### Components

You can add or modify Vue components in the `resources/js/components` directory. These components can then be used in your pages.

## Official Documentation

Documentation for all Laravel starter kits can be found on the [Laravel website](https://laravel.com/docs/starter-kits).

## Contributing

Thank you for considering contributing to our starter kit! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## License

The Laravel + Vue starter kit is open-sourced software licensed under the MIT license.