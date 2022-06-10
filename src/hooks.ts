import type { Handle } from '@sveltejs/kit';

// Until this issue gets resolved, must disable SSR for lamina scenes
const nonSSRPaths: string[] = [
  "the-expanse",
  "lamina-noisy-spheres"
]

export const handle: Handle = async ({ event, resolve }) => {
  if (nonSSRPaths.some(path => event.url.pathname.includes(path))) {
    return await resolve(event, { ssr: false });
  }

  return await resolve(event);
};