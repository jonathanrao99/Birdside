import nextVitals from 'eslint-config-next/core-web-vitals'

/** Reference-only Peckers tree — exclude from lint (large vendor/build output). */
const config = [
  {
    ignores: ["peckers-master/**"]
  },
  ...nextVitals
]

export default config
