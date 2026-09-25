/**
 * Turns links to https://docs.hardwario.com/<page> into root-relative ones.
 *
 * A full URL is taken as an external link, so Docusaurus leaves it alone: it
 * does not check it for breakage, and on the Czech site it does not add the
 * /cs/ prefix, which sends a Czech reader to the English page. A root-relative
 * link gets both. This covers bare URLs too, which remark-gfm turns into links
 * before this runs; the visible text of those is left as written.
 *
 * Links into the /cs/ tree and to files (anything with an extension) are kept.
 */
const ORIGIN = /^https:\/\/docs\.hardwario\.com(?=\/|$)/;

function rewrite(url) {
  if (typeof url !== 'string' || !ORIGIN.test(url)) return url;
  const rest = url.replace(ORIGIN, '').replace(/^\/+/, '/') || '/';
  const pathname = rest.split(/[?#]/)[0];
  if (/^\/cs(\/|$)/.test(pathname) || /\.[a-z0-9]{2,5}$/i.test(pathname)) return url;
  return rest;
}

function visit(node) {
  if (node.type === 'link' || node.type === 'definition') node.url = rewrite(node.url);
  if (node.children) node.children.forEach(visit);
}

module.exports = function absoluteDocsLinks() {
  return (tree) => visit(tree);
};
module.exports.rewrite = rewrite;
