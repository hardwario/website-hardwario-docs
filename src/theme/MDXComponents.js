// The default MDX component map plus the tags our remark plugins emit, so the
// generated elements (and a hand-written one) need no import on the page.
import MDXComponents from '@theme-original/MDXComponents';
import YouTubeEmbed from '@site/src/components/YouTubeEmbed';

export default {
  ...MDXComponents,
  YouTubeEmbed,
};
