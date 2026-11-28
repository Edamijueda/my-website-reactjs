/**
 * Based on https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/
 */

import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';

function usePrefersReducedMotion() {
  /*
   * Starts at `true` on the client as well as the server, so the first client
   * render produces the same markup the server did. Asking matchMedia here instead
   * would answer differently on the two, and React would throw a hydration mismatch
   * (#418) — which is exactly what /404/ used to do on every load.
   *
   * The real value arrives in the effect below, after hydration has finished. Any
   * effect that reads this value therefore needs it in its dependency array, or it
   * will run once against the placeholder and never see the real answer.
   */
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(true);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY);
    setPrefersReducedMotion(!mediaQueryList.matches);

    const listener = event => setPrefersReducedMotion(!event.matches);
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, []);

  return prefersReducedMotion;
}

export default usePrefersReducedMotion;
