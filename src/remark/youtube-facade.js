/**
 * Puts every YouTube video behind a click.
 *
 * A YouTube iframe contacts Google as soon as the page opens, before the
 * visitor has done anything, and this site has no consent banner. So each
 * embed is replaced at build time by <YouTubeEmbed>, a neutral poster that
 * loads the video from www.youtube-nocookie.com only when its play button is
 * pressed (src/components/YouTubeEmbed). The static HTML then names no Google
 * host at all: no iframe, and no thumbnail either (i.ytimg.com is Google too).
 *
 * Forms caught, so a new page needs nothing special:
 * - <iframe src="https://www.youtube.com/embed/ID?...">, together with the
 *   padding-bottom ratio <div> around it when the iframe is its only child
 *   (the poster keeps 16:9 itself);
 * - <ReactPlayer src="https://youtu.be/ID" /> (or url=); the react-player
 *   import is dropped once nothing on the page uses it.
 * Anything else (a ReactPlayer pointing at a video file, a src that is an
 * expression) is left as written.
 *
 * Parameters of the original URL are kept (start time, rel=0, playlist...),
 * except the share-tracking ones YouTube appends to copied links (si, feature,
 * pp) and autoplay, which the player sets itself once the visitor has asked.
 *
 * The play button needs an accessible name, and most embeds here carry the
 * generic title "YouTube video player". A real iframe title is kept; a generic
 * one becomes the page's H1 (front matter title as a fallback) or, on a page
 * with several videos, the heading above each video.
 */
const COMPONENT = 'YouTubeEmbed';

const DROP_PARAMS = new Set(['v', 'si', 'feature', 'pp', 'ab_channel', 'autoplay']);
const GENERIC_TITLE = /^\s*(youtube\s*)?(video\s*)?(player)?\s*$/i;
const ID = /^[\w-]{6,20}$/;

// "90", "90s", "1m30s", "1h2m3s" -> seconds; anything else -> null.
function seconds(value) {
  if (/^\d+$/.test(value)) return Number(value);
  const m = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/.exec(value || '');
  if (!m || !m[0]) return null;
  return Number(m[1] || 0) * 3600 + Number(m[2] || 0) * 60 + Number(m[3] || 0);
}

// Returns {id, params} for a YouTube video URL, or null for anything else.
function parseYouTube(raw) {
  if (typeof raw !== 'string') return null;
  let url;
  try {
    url = new URL(raw.trim().replace(/^\/\//, 'https://'));
  } catch {
    return null;
  }
  const host = url.hostname.toLowerCase().replace(/^(www|m)\./, '');
  let id = null;
  if (host === 'youtu.be') {
    id = url.pathname.split('/')[1];
  } else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    const m = /^\/(?:embed|shorts|live|v)\/([^/]+)/.exec(url.pathname);
    if (m) id = m[1];
    else if (url.pathname === '/watch') id = url.searchParams.get('v');
  }
  if (!id || !ID.test(id)) return null;

  const params = new URLSearchParams();
  for (const [key, value] of url.searchParams) {
    if (DROP_PARAMS.has(key)) continue;
    // Watch and share links say t=; the embed player wants start= in seconds.
    if (key === 't' || key === 'time_continue') {
      const s = seconds(value);
      if (s) params.set('start', String(s));
      continue;
    }
    params.append(key, value);
  }
  const hashTime = /(?:^#|&)t=([\dhms]+)/.exec(url.hash);
  if (hashTime && !params.has('start')) {
    const s = seconds(hashTime[1]);
    if (s) params.set('start', String(s));
  }
  return { id, params: params.toString() };
}

function isJsx(node) {
  return node && (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement');
}

// A string attribute, a literal in braces ({'...'}), true for a bare boolean
// attribute, or undefined.
function attribute(node, name) {
  const want = name.toLowerCase();
  const attr = (node.attributes || []).find(
    (a) => a.type === 'mdxJsxAttribute' && a.name.toLowerCase() === want,
  );
  if (!attr) return undefined;
  if (attr.value == null) return true;
  if (typeof attr.value === 'string') return attr.value;
  const literal = /^\s*(['"`])([^'"`]*)\1\s*$/.exec(attr.value.value || '');
  return literal ? literal[2] : undefined;
}

// The video an element embeds, or null when it is not a YouTube embed.
function videoOf(node) {
  if (!isJsx(node)) return null;
  if (node.name === 'iframe') {
    const video = parseYouTube(attribute(node, 'src'));
    if (!video) return null;
    const title = attribute(node, 'title');
    return { ...video, title: typeof title === 'string' && !GENERIC_TITLE.test(title) ? title.trim() : '' };
  }
  if (node.name === 'ReactPlayer') {
    const src = attribute(node, 'src');
    const video = parseYouTube(typeof src === 'string' ? src : attribute(node, 'url'));
    return video ? { ...video, title: '' } : null;
  }
  return null;
}

function meaningful(children) {
  return (children || []).filter((c) => !(c.type === 'text' && !c.value.trim()));
}

// The video element a node stands for: the element itself, a paragraph holding
// only it, or a <div> (the old padding-bottom ratio box) holding only it.
function embeddedVideo(node) {
  const own = videoOf(node);
  if (own) return { element: node, video: own };
  if (node.type === 'paragraph' || (isJsx(node) && node.name === 'div')) {
    const inner = meaningful(node.children);
    if (inner.length === 1) return embeddedVideo(inner[0]);
  }
  return null;
}

function textOf(node) {
  if (node.type === 'text' || node.type === 'inlineCode') return node.value;
  return (node.children || []).map(textOf).join('');
}

module.exports = function youtubeFacade() {
  return (tree, file) => {
    const found = [];
    let h1 = '';
    let heading = '';
    let reactPlayerLeft = false;

    (function walk(node) {
      (node.children || []).forEach((child, index) => {
        if (child.type === 'heading') {
          heading = textOf(child).replace(/\s+/g, ' ').trim();
          if (child.depth === 1 && !h1) h1 = heading;
          return;
        }
        const hit = embeddedVideo(child);
        if (hit) {
          found.push({ parent: node, index, node: child, video: hit.video, heading });
          return;
        }
        if (isJsx(child) && child.name === 'ReactPlayer') reactPlayerLeft = true;
        if (/ReactPlayer/.test((child.type.startsWith('mdx') && child.type !== 'mdxjsEsm' && child.value) || '')) {
          reactPlayerLeft = true;
        }
        walk(child);
      });
    })(tree);

    if (found.length === 0) return;

    const pageTitle = h1 || (file && file.data && file.data.frontMatter && file.data.frontMatter.title) || '';
    for (const { parent, index, node, video, heading: above } of found) {
      const title = video.title || (found.length > 1 && above) || pageTitle || above;
      const attributes = [
        { type: 'mdxJsxAttribute', name: 'id', value: video.id },
        { type: 'mdxJsxAttribute', name: 'title', value: title },
      ];
      if (video.params) attributes.push({ type: 'mdxJsxAttribute', name: 'params', value: video.params });
      // A video alone in its block becomes a block; one inside running text
      // stays inline so the paragraph around it is not torn apart.
      const inline = node.type === 'mdxJsxTextElement';
      parent.children[index] = {
        type: inline ? 'mdxJsxTextElement' : 'mdxJsxFlowElement',
        name: COMPONENT,
        attributes,
        children: [],
        position: node.position,
      };
    }

    // `import ReactPlayer from 'react-player'` would still pull the library
    // into the page bundle, so it goes once no ReactPlayer is left to use it.
    if (!reactPlayerLeft) {
      tree.children = tree.children.filter((node) => {
        if (node.type !== 'mdxjsEsm' || !node.data || !node.data.estree) return true;
        const body = node.data.estree.body.filter(
          (s) => !(s.type === 'ImportDeclaration' && s.source.value === 'react-player'),
        );
        if (body.length === node.data.estree.body.length) return true;
        node.data.estree.body = body;
        node.value = node.value
          .split('\n')
          .filter((line) => !/from\s+['"]react-player['"]/.test(line))
          .join('\n');
        return body.length > 0;
      });
    }
  };
};
module.exports.parseYouTube = parseYouTube;
