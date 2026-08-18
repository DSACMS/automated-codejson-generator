import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["dist/**", "node_modules/**", "src/__tests__"],
  },

  ...tseslint.configs.recommended,
];
