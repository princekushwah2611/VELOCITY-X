/**
 * Helper to ensure static assets resolve properly with configurable basePath
 * for GitHub Pages deployments or custom root paths.
 */
export function getAssetPath(path) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${basePath}${cleanPath}`;
}
