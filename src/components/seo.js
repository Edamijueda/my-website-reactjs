import React from 'react';
import PropTypes from 'prop-types';
import { siteMetadata, googleSiteVerification } from '@config';

// https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
//
// Rendered from each page's `Head` export, never from a component: Gatsby only
// collects head tags from a page or a createPage template. That is also why the
// site metadata is imported instead of fetched with `useStaticQuery` — the Head
// function has no access to React context until Gatsby 5.6.
const Seo = ({ title = null, description = null, image = null, type = 'website', pathname }) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    image: defaultImage,
    twitterUsername,
  } = siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <>
      {/* Replaces react-helmet's titleTemplate: pages add their own name, the
          home page is left as the bare site title. */}
      <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>

      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      {/* og:site_name carries the site name so a card reading just "Archive" still
          has context — og:title is the page's own title, without the " | site"
          suffix that belongs on <title> rather than on a social card. */}
      <meta property="og:site_name" content={defaultTitle} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content={type} />

      {/* "summary", not "summary_large_image": the only image is the 470x525 logo,
          which a large card would centre-crop. A real 1200x630 card would make
          summary_large_image correct again. */}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <meta name="google-site-verification" content={googleSiteVerification} />
    </>
  );
};

export default Seo;

Seo.propTypes = {
  title: PropTypes.string,
  type: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string.isRequired,
};
