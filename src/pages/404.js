import React from 'react';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { Layout, Seo } from '@components';

/*
 * The same fade-up the rest of the site uses, as a keyframe rather than a
 * CSSTransition. Values copied from `.fadeup-enter` in TransitionStyles.js.
 */
const fadeUp = keyframes`
  from {
    opacity: 0.01;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const StyledMainContainer = styled.main`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;

  /*
   * This used to be a CSSTransition held shut by a setTimeout of navDelay, which
   * left the page blank for a second. navDelay is there to let the home page's
   * loader finish; /404/ has no loader, so it was waiting on nothing.
   *
   * In CSS the animation starts on first paint, reduced motion is the absence of
   * this rule instead of a different render, and the markup is now identical on the
   * server and the client — so there is nothing to hydrate around either.
   */
  @media (prefers-reduced-motion: no-preference) {
    animation: ${fadeUp} 300ms var(--easing) both;
  }
`;

const StyledTitle = styled.h1`
  color: var(--green);
  font-family: var(--font-mono);
  font-size: clamp(100px, 25vw, 200px);
  line-height: 1;
`;
const StyledSubtitle = styled.h2`
  font-size: clamp(30px, 5vw, 50px);
  font-weight: 400;
`;
const StyledHomeButton = styled(Link)`
  ${({ theme }) => theme.mixins.bigButton};
  margin-top: 40px;
`;

const NotFoundPage = ({ location }) => (
  <Layout location={location}>
    <StyledMainContainer className="fillHeight">
      <StyledTitle>404</StyledTitle>
      <StyledSubtitle>Page Not Found</StyledSubtitle>
      <StyledHomeButton to="/">Go Home</StyledHomeButton>
    </StyledMainContainer>
  </Layout>
);

NotFoundPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default NotFoundPage;

export const Head = ({ location }) => <Seo title="Page Not Found" pathname={location.pathname} />;

Head.propTypes = {
  location: PropTypes.object.isRequired,
};
