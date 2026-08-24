import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPos, setFollowerPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isScreenshotting, setIsScreenshotting] = useState(false);

  useEffect(() => {
    // Check if device supports touch/hover
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouch(true);
      return;
    }

    let scrollTimeout: NodeJS.Timeout;
    let screenshotTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      if (isScreenshotting) return;
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
    const handleMouseEnter = () => {
      if (!isScreenshotting) setIsVisible(true);
    };

    const handleScroll = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 120);
    };

    // Hide cursor during screenshots and window focus loss (e.g. Snipping Tool overlay)
    const handleWindowBlur = () => {
      setIsVisible(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Common screenshot hotkeys:
      // PrintScreen key
      // Win + Shift + S (Windows Snipping Tool)
      // Cmd + Shift + 3/4/5 (macOS Screenshots)
      // Ctrl + Shift + S / X
      const isScreenshotKey =
        e.key === 'PrintScreen' ||
        ((e.metaKey || e.ctrlKey) && e.shiftKey && ['3', '4', '5', 's', 'S', 'x', 'X'].includes(e.key)) ||
        (e.key === 'F11');

      if (isScreenshotKey) {
        setIsScreenshotting(true);
        setIsVisible(false);
        clearTimeout(screenshotTimeout);
        screenshotTimeout = setTimeout(() => {
          setIsScreenshotting(false);
        }, 4000);
      }
    };

    const handleBeforePrint = () => {
      setIsVisible(false);
      setIsScreenshotting(true);
    };

    const handleAfterPrint = () => {
      setIsScreenshotting(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      clearTimeout(scrollTimeout);
      clearTimeout(screenshotTimeout);
    };
  }, [isVisible, isScreenshotting]);

  // Smooth easing for outer follower ring
  useEffect(() => {
    if (isTouch || !isVisible || isScreenshotting) return;

    let animFrame: number;
    const loop = () => {
      setFollowerPos((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        return {
          x: prev.x + dx * 0.28, // Fast, crisp tracking
          y: prev.y + dy * 0.28,
        };
      });
      animFrame = requestAnimationFrame(loop);
    };
    animFrame = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animFrame);
  }, [position, isTouch, isVisible, isScreenshotting]);

  if (isTouch || !isVisible || isScreenshotting) return null;

  return (
    <div
      id="custom-cursor"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden print:hidden select-none"
      aria-hidden="true"
    >
      {/* Outer Follower Ring - Compact 14px subtle aesthetic (instead of bulky 28px) */}
      <div
        className={`fixed top-0 left-0 rounded-full border transition-all duration-150 ease-out ${
          isHovered
            ? 'border-yellow-400 bg-yellow-400/20'
            : isMouseDown
            ? 'border-yellow-500 bg-yellow-400/40'
            : isScrolling
            ? 'border-yellow-400/90 bg-yellow-400/15'
            : 'border-yellow-400/70 bg-yellow-400/5'
        }`}
        style={{
          width: '14px',
          height: '14px',
          transform: `translate3d(${followerPos.x - 7}px, ${followerPos.y - 7}px, 0) ${
            isHovered
              ? 'scale(1.25)'
              : isMouseDown
              ? 'scale(0.85)'
              : isScrolling
              ? 'scale(1.1)'
              : 'scale(1)'
          }`,
          boxShadow: isScrolling
            ? '0 0 6px rgba(250, 204, 21, 0.3)'
            : isHovered
            ? '0 0 6px rgba(250, 204, 21, 0.25)'
            : '0 0 3px rgba(250, 204, 21, 0.1)',
        }}
      />

      {/* Inner Precision Center Dot - Compact 3.5px Solid Core */}
      <div
        className={`fixed top-0 left-0 rounded-full bg-yellow-400 transition-transform duration-75 ${
          isHovered ? 'scale-110 bg-yellow-300' : isMouseDown ? 'scale-75' : 'scale-100'
        }`}
        style={{
          width: '3.5px',
          height: '3.5px',
          transform: `translate3d(${position.x - 1.75}px, ${position.y - 1.75}px, 0)`,
          boxShadow: '0 0 3px rgba(250, 204, 21, 0.4)',
        }}
      />
    </div>
  );
};
