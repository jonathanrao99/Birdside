import nextVitals from 'eslint-config-next/core-web-vitals'

/** Reference-only Peckers tree — exclude from lint (large vendor/build output). */
const config = [
  {
    ignores: [
      "peckers-master/**",
      "playwright-report/**",
      "test-results/**",
      ".next/**"
    ]
  },
  ...nextVitals
]

export default config
