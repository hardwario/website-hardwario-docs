// WebP sources for <Image img={require('./images/x.webp')} /> (@theme/IdealImage).
//
// The ideal-image plugin resizes PNG and JPEG sources only, and its component cannot be fed
// WebP variants: it picks WebP only where canvas.toDataURL('image/webp') works (not in Safari)
// and otherwise needs a non-WebP file in the same set. A photo with a transparent background
// has no small PNG, so such images are stored as WebP and take the default asset path instead
// (one file, no resized variants).
//
// This plugin adds the pixel size to that asset module, so the wrapper in
// src/theme/IdealImage can render a lazy <img> that reserves its space, the way Docusaurus
// renders Markdown images. Only a require() of a .webp file from a Markdown page is affected;
// `![](x.webp)` images use an inline loader and never reach this rule.
const path = require('path');

module.exports = function webpImageSize() {
  return {
    name: 'webp-image-size',
    configureWebpack() {
      return {
        // Before the default image rule, so this loader runs after the URL loader.
        mergeStrategy: { 'module.rules': 'prepend' },
        module: {
          rules: [
            {
              test: /\.webp$/i,
              issuer: /\.mdx?$/i,
              use: [path.join(__dirname, 'size-loader.js')],
            },
          ],
        },
      };
    },
  };
};
