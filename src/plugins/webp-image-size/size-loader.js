// Appends the pixel size of an image to the module the URL loader produced for it:
//   export default "<url>";  ->  the same, plus `export const width` and `export const height`.
// See index.js for why.

// sharp is not a direct dependency of the site: use the copy the ideal-image plugin runs on.
const sharp = require(
  require.resolve('sharp', {
    paths: [require.resolve('@docusaurus/plugin-ideal-image/package.json')],
  }),
);

module.exports = function webpSizeLoader(source) {
  const callback = this.async();
  const code = String(source);
  if (!/^export default /.test(code)) {
    callback(new Error(`webp-image-size: unexpected module for ${this.resourcePath}`));
    return;
  }
  sharp(this.resourcePath)
    .metadata()
    .then(({ width, height }) => {
      callback(null, `${code}\nexport const width = ${width};\nexport const height = ${height};\n`);
    })
    .catch(callback);
};
