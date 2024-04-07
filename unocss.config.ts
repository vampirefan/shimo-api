import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'bg-active': 'bg-gray:10',
  },
  safelist: [
    'i-carbon-character-whole-number',
    'i-carbon-cross-tab',
    'i-carbon-document-pdf',
    'i-carbon-face-satisfied',
    'i-carbon-language',
    'i-carbon-map',
    'i-carbon-move',
    'i-carbon-row-insert',
    'i-carbon-star-review',
    'i-carbon-tool-box',
    'i-ep-edit-pen',
    'i-ep-magic-stick',
    'i-ep-menu',
    'i-logos-markdown',
    'i-prime-prime',
    'i-twemoji-blue-book',
    'i-twemoji-books',
    'i-twemoji-rocket',
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({ scale: 1.2 }),
    presetTypography(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
