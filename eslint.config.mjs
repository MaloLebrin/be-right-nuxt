// @ts-check
// import withNuxt from './.nuxt/eslint.config.mjs'
// import antfu from '@antfu/eslint-config'

// export default withNuxt(
//   // antfu(), // TODO enable
// )
import { createConfigForNuxt } from '@nuxt/eslint-config/flat'

export default createConfigForNuxt({
  // options here
})
  .override('nuxt/typescript/rules', {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off', // TODO move to warn
      'no-useless-escape': 'off', // TODO move to warn
      "indent": ["error", 2, {
        "SwitchCase": 1
      }],
      "vue/html-indent": ["error", 2, {
        "baseIndent": 0
      }],
      "vue/component-tags-order": ["error", {
        "order": ["template", "script", "style"]
      }],
      "vue/max-attributes-per-line": ["error", {
        "singleline": {
          "max": 1
        },
        "multiline": {
          "max": 1
        }
      }],
      "vue/no-unused-components": ["error", {
        "ignoreWhenBindingPresent": true
      }],
      "vue/no-unused-vars": ["error", {
        "ignorePattern": "^_"
      }],
      "vue/no-template-shadow": "off",
      "vue/v-on-event-hyphenation": "off",
      "vue/return-in-computed-property": "off",

      "no-console": ["warn", { "allow": ["warn", "error", "time", "timeEnd"] }],
      "curly": [0, "all"],
      "brace-style": [0, "stroustrup", { "allowSingleLine": false }],
      "@typescript-eslint/brace-style": [0, "stroustrup", { "allowSingleLine": false }],
      "no-unused-vars": "off",
      "antfu/top-level-function": "off",
      "@typescript-eslint/no-unused-vars": ["off"],
      "arrow-parens": [2, "as-needed"],
      '@typescript-eslint/no-dynamic-delete': 'off',
      "@typescript-eslint/no-duplicate-enum-values": "off",
      "@typescript-eslint/no-empty-object-type": "off",
    }
  })
