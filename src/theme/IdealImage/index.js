/**
 * Wraps the ideal-image component so it also takes WebP sources.
 *
 * A PNG or JPEG source arrives as the loader object ({src, preSrc}) and goes to the original
 * component unchanged. A WebP source arrives as a plain asset module, {default: url, width,
 * height} (the size comes from src/plugins/webp-image-size). The original component would
 * render that as a bare <img>: loaded at once, no reserved space, and with the page's
 * width/height props applied, which it ignores for PNG and JPEG. Render it instead as
 * Docusaurus renders a Markdown image, a lazy <img> with its own pixel size, and keep the
 * geometry of the original: full width of the container, height by aspect ratio.
 */
import React from 'react';
import IdealImage from '@theme-original/IdealImage';

// The inline styles of the original <img> (IdealImageLegacy theme).
const style = { width: '100%', height: 'auto', maxWidth: '100%', marginBottom: '-4px' };

export default function IdealImageWrapper(props) {
  const { img } = props;
  if (img && typeof img === 'object' && 'default' in img && img.width && img.height) {
    // eslint-disable-next-line no-unused-vars
    const { img: _img, width: _width, height: _height, ...rest } = props;
    return (
      // eslint-disable-next-line jsx-a11y/alt-text
      <img
        src={img.default}
        width={img.width}
        height={img.height}
        loading="lazy"
        decoding="async"
        style={style}
        {...rest}
      />
    );
  }
  return <IdealImage {...props} />;
}
