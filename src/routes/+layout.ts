import { maculaInstance } from '$lib/appStore.js';

export const ssr = true;
export const csr = true;
export const prerender = true;
export const trailingSlash = 'always';

export async function load({ fetch }) {
  const res = await maculaInstance.me(fetch);

  return res;
}
