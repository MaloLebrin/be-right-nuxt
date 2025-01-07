import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends("@antfu"), {
    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.browser,
            ...globals.jest,
        },

        parser: tsParser,
        ecmaVersion: 5,
        sourceType: "commonjs",

        parserOptions: {
            project: "tsconfig.json",
            tsconfigRootDir: ".",
        },
    },

    settings: {
        "import/resolver": {
            typescript: true,
            node: true,
        },
    },

    rules: {
        indent: ["error", 2, {
            SwitchCase: 1,
        }],

        "vue/html-indent": ["error", 2, {
            baseIndent: 0,
        }],

        "vue/component-tags-order": ["error", {
            order: ["template", "script", "style"],
        }],

        "vue/max-attributes-per-line": ["error", {
            singleline: {
                max: 1,
            },

            multiline: {
                max: 1,
            },
        }],

        "vue/no-unused-components": ["error", {
            ignoreWhenBindingPresent: true,
        }],

        "vue/no-unused-vars": ["error", {
            ignorePattern: "^_",
        }],

        "vue/no-template-shadow": "off",
        "vue/v-on-event-hyphenation": "off",

        "no-console": ["warn", {
            allow: ["warn", "error", "time", "timeEnd"],
        }],

        curly: [0, "all"],

        "brace-style": [0, "stroustrup", {
            allowSingleLine: false,
        }],

        "@typescript-eslint/brace-style": ["off", {
            allowSingleLine: false,
        }],

        "no-unused-vars": "off",
        "antfu/top-level-function": "off",
        "@typescript-eslint/no-unused-vars": ["off", {}],
        "arrow-parens": [2, "as-needed"],
    },
}];