import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device supports touch/hover
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    let scrollTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if target is interactive
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer')
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseDown = () => setIsMouseDown(true);
    const handleMouseUp = () => setIsMouseDown(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(scrollTimeout);
    };
  }, [isVisible]);

  // Smooth lag/easing for outer follower ring - elegant, responsive fluid movement
  useEffect(() => {
    if (isTouch || !isVisible) return;

    let animFrame: number;
    const loop = () => {
      setFollowerPos((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.24, // Smooth fluid tracking
          y: prev.y + dy * 0.24,
        };
      });
      animFrame = requestAnimationFrame(loop);
    };
    animFrame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animFrame);
  }, [position, isTouch, isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Follower Ring - 28px Base Size with Professional Smooth Expansion */}
      <div
        className={`fixed top-0 left-0 rounded-full border transition-all duration-200 ease-out ${
          isHovered
            ? 'border-yellow-400 bg-yellow-400/20 backdrop-blur-[1px]'
            : isMouseDown
            ? 'border-yellow-500 bg-yellow-400/40'
            : isScrolling
            ? 'border-yellow-400 bg-yellow-400/25 backdrop-blur-[1px]'
            : 'border-yellow-400/80 bg-yellow-400/5'
        }`}
        style={{
          width: '28px',
          height: '28px',
          transform: `translate3d(${followerPos.x - 14}px, ${followerPos.y - 14}px, 0) ${
            isHovered
              ? 'scale(1.6)'
              : isMouseDown
              ? 'scale(0.85)'
              : isScrolling
              ? 'scale(1.5)'
              : 'scale(1)'
          }`,
          boxShadow: isScrolling
            ? '0 0 18px rgba(250, 204, 21, 0.45), inset 0 0 8px rgba(250, 204, 21, 0.2)'
            : isHovered
            ? '0 0 14px rgba(250, 204, 21, 0.35)'
            : '0 0 6px rgba(250, 204, 21, 0.15)',
        }}
      />

      {/* Inner Precision Center Dot - 6px Solid Core */}
      <div
        className={`fixed top-0 left-0 rounded-full bg-yellow-400 transition-transform duration-100 ${
          isHovered ? 'scale-125 bg-black dark:bg-yellow-300' : isMouseDown ? 'scale-50' : 'scale-100'
        }`}
        style={{
          width: '6px',
          height: '6px',
          transform: `translate3d(${position.x - 3}px, ${position.y - 3}px, 0)`,
          boxShadow: '0 0 6px rgba(250, 204, 21, 0.6)',
        }}
      />
    </div>
  );
};
