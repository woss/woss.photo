import { maculaInstance } from '$src/appStore.js';

export const csr = true;
export const prerender = true;

export async function load({ fetch }) {
  const me = await maculaInstance.me(fetch);

  return { ...me };
}
