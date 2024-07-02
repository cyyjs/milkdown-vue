import globals from "globals";
import pluginJs from "@eslint/js";
import pluginVue from "eslint-plugin-vue";

export default [

  ...pluginVue.configs["flat/essential"],
  {
    languageOptions: { globals: globals.browser },
    files: ["src/**/*.{js,mjs,cjs,vue}"],
    rules: {
      ...pluginJs.configs.recommended.rules,
      "vue/multi-word-component-names": "off",
      "no-unused-vars": "off",
      // "no-console": "off",
      // "no-debugger": "off",
      // "no-empty": "off",
      // "no-unreachable": "off",
      // "no-extra-semi": "off",
      // "no-unused-expressions": "off",
    }
  },
];