// src/components/AnimatedCounter.jsx
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const AnimatedCounter = ({ value, prefix = '', suffix = '', duration = 1.5 }) => {
  const counterRef = useRef(null);

  useEffect(() => {
    if (!counterRef.current) return;

    const targetVal = parseFloat(value);
    if (isNaN(targetVal)) {
      counterRef.current.innerText = value;
      return;
    }

    const obj = { val: 0 };
    gsap.to(obj, {
      val: targetVal,
      duration: duration,
      ease: 'power2.out',
      onUpdate: () => {
        if (counterRef.current) {
          const isInt = targetVal % 1 === 0;
          counterRef.current.innerText = isInt 
            ? Math.floor(obj.val).toLocaleString() 
            : obj.val.toFixed(2);
        }
      }
    });
  }, [value, duration]);

  return (
    <span>
      {prefix}
      <span ref={counterRef}>0</span>
      {suffix}
    </span>
  );
};
export default AnimatedCounter;
