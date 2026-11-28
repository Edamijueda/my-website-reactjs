import React, { useState, useEffect, useRef, createRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 5px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, [prefersReducedMotion]);

  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Tobi Omorubore.</h2>;
  const three = <h3 className="big-heading">I build for mobile & web.</h3>;
  const four = (
    <>
      <p>
        Software engineer 👨🏽‍💻 building exceptional digital experiences. Automate processes +
        Integrate AI into Apps. Currently focused on Postcode-NG
        {/* <a
          href="https://play.google.com/store/apps/details?id=org.collaction.collaction_app&pli=1"
          target="_blank"
          rel="noreferrer">
          Postcode-NG
        </a> */}
        , a solution for easy postcodes lookup by states, city or street. In my spare time 👉🏽{' '}
        Contribute to <a href="https://github.com/devondragon/SpringUserFramework">OpenSource</a>.{' '}
        {/* <em>Practising to get better at building AI features into Apps</em>. */}
      </p>
    </>
  );
  const five = (
    <a
      className="email-link"
      href="https://wa.me/qr/64TXVGPQ5RFXL1 "
      target="_blank"
      rel="noreferrer">
      Request Demo!
    </a>
  );

  const items = [one, two, three, four, five];

  // react-transition-group falls back to findDOMNode without a nodeRef, and React 19
  // removed findDOMNode. One ref per animated item.
  const nodeRefs = useRef([]);
  const nodeRef = i => (nodeRefs.current[i] ||= createRef());

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} nodeRef={nodeRef(i)} classNames="fadeup" timeout={loaderDelay}>
                <div ref={nodeRef(i)} style={{ transitionDelay: `${i + 1}00ms` }}>
                  {item}
                </div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
