/**
 * Swizzled DocCard to fix Docusaurus bug where ASCII digits (0-9) are
 * incorrectly detected as emojis via Unicode \p{Emoji} property.
 * This causes labels like "1-Wire Bus" to split into icon="1", title="-Wire Bus".
 */
import React from 'react';
import {
  useDocById,
  findFirstSidebarItemLink,
} from '@docusaurus/plugin-content-docs/client';
import {
  extractLeadingEmoji,
  useDocCardDescriptionCategoryItemsPlural,
} from '@docusaurus/theme-common/internal';
import isInternalUrl from '@docusaurus/isInternalUrl';
import Layout from '@theme/DocCard/Layout';

function getFallbackEmojiIcon(item) {
  if (item.type === 'category') {
    return '🗃';
  }
  return isInternalUrl(item.href) ? '📄️' : '🔗';
}

function getIconTitleProps(item) {
  const extracted = extractLeadingEmoji(item.label);
  // ASCII digits (0-9) have Unicode Emoji property but are not real emoji glyphs.
  // Treat any extracted "emoji" that is a plain ASCII character as non-emoji.
  const isRealEmoji =
    extracted.emoji != null &&
    extracted.emoji.codePointAt(0) > 127;
  const emoji = isRealEmoji ? extracted.emoji : getFallbackEmojiIcon(item);
  const title = isRealEmoji ? extracted.rest.trim() : item.label;
  return {icon: emoji, title};
}

function CardCategory({item}) {
  const href = findFirstSidebarItemLink(item);
  const categoryItemsPlural = useDocCardDescriptionCategoryItemsPlural();
  if (!href) {
    return null;
  }
  return (
    <Layout
      item={item}
      className={item.className}
      href={href}
      description={item.description ?? categoryItemsPlural(item.items.length)}
      {...getIconTitleProps(item)}
    />
  );
}

function CardLink({item}) {
  const doc = useDocById(item.docId ?? undefined);
  return (
    <Layout
      item={item}
      className={item.className}
      href={item.href}
      description={item.description ?? doc?.description}
      {...getIconTitleProps(item)}
    />
  );
}

export default function DocCard({item}) {
  switch (item.type) {
    case 'link':
      return <CardLink item={item} />;
    case 'category':
      return <CardCategory item={item} />;
    default:
      throw new Error(`unknown item type ${JSON.stringify(item)}`);
  }
}
