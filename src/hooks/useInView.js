import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

/** Observe only until the first entrance; long mobile groups start at their top. */
export function useInView() {
  const ref = useRef(null);
  const [entered, setEntered] = useState(() => !('IntersectionObserver' in window));
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (entered || reducedMotion) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntered(true);
        observer.disconnect();
      }
    }, { threshold: 0, rootMargin: '0px 0px -32px 0px' });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [entered, reducedMotion]);

  return { ref, visible: entered || reducedMotion };
}
