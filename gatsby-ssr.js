/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// `<html lang>` used to come from react-helmet. The Head API cannot set attributes
// on html or body until Gatsby 5.5, and this is the canonical place for it anyway:
// it is static, and it has to be in the server-rendered markup for assistive
// technology and search engines to see it.
exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'en' });
};
