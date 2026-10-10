/**
 * VELOCITY X — Device, WebGL & Accessibility Capability Detector (v2.0)
 */

export function checkCapabilities() {
  if (typeof window === 'undefined') {
    return {
      hasWebGL: true,
      prefersReducedMotion: false,
      isMobile: false,
      tier: 'high',
    };
  }

  // 1. Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 2. Check WebGL availability
  let hasWebGL = false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    hasWebGL = Boolean(gl && gl instanceof WebGLRenderingContext || (window.WebGL2RenderingContext && gl instanceof WebGL2RenderingContext));
  } catch (e) {
    hasWebGL = false;
  }

  // 3. Screen width / device classification
  const width = window.innerWidth;
  const isMobile = width < 768;

  // 4. Default quality tier
  let tier = 'high';
  if (!hasWebGL || prefersReducedMotion) {
    tier = 'static';
  } else if (isMobile) {
    tier = 'low';
  } else if (width < 1200) {
    tier = 'medium';
  }

  return {
    hasWebGL,
    prefersReducedMotion,
    isMobile,
    tier,
  };
}
