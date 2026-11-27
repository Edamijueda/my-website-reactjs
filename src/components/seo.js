import React from 'react';
import PropTypes from 'prop-types';
import { siteMetadata, googleSiteVerification } from '@config';

// https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
//
// Rendered from each page's `Head` export, never from a component: Gatsby only
// collects head tags from a page or a createPage template. That is also why the
// site metadata is imported instead of fetched with `useStaticQuery` — the Head
// function has no access to React context until Gatsby 5.6.
const Seo = ({ title = null, description = null, image = null, pathname }) => {
  const {
    title: defaultTitle,
    description: defaultDescription,
    siteUrl,
    image: defaultImage,
    twitterUsername,
  } = siteMetadata;

  const seo = {
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

      {/* og:title and twitter:title were the site name on every page under
          react-helmet, because the SEO block was rendered from Layout without a
          title. Kept as-is here so this migration changes no output; see the
          follow-up issue about giving each page its own social title. */}
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={defaultTitle} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <meta name="google-site-verification" content={googleSiteVerification} />
    </>
  );
};

export default Seo;

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  pathname: PropTypes.string.isRequired,
};
