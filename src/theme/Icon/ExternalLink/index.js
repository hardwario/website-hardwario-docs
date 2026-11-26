import React from 'react';
import {translate} from '@docusaurus/Translate';
import Lucide from '@site/src/components/Lucide';

// Brand: the Lucide external-link icon instead of the Docusaurus one, with the
// stock component's size, spacing and screen-reader label.
export default function IconExternalLink({width = 13.5, height = 13.5}) {
  return (
    <Lucide
      name="external-link"
      width={width}
      height={height}
      style={{marginLeft: '0.3rem', verticalAlign: 'middle'}}
      aria-label={translate({
        id: 'theme.IconExternalLink.ariaLabel',
        message: '(opens in new tab)',
        description: 'The ARIA label for the external link icon',
      })}
    />
  );
}
