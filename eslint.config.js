// Import necessary modules
import {defineConfigWithVueTs, vueTsConfigs} from "@vue/eslint-config-typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import oxlint from "eslint-plugin-oxlint";
import pluginVue from "eslint-plugin-vue";

export default defineConfigWithVueTs(
    {
        files: ["resources/**/*.{ts,js,vue,d.ts}"],
    },
    pluginVue.configs["flat/recommended"],
    vueTsConfigs.recommended,
    oxlint.configs["flat/recommended"],
    eslintConfigPrettier,
    {
        rules: {
            "vue/block-order": ['error', {'order': ['script:not([setup])', 'script[setup]', 'template', 'style']}],
            "curly": ["error", "all"],
            "vue/multi-word-component-names": "off",
            "semi": ["error", "always"],
        },
    },
);
