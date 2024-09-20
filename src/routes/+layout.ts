import { maculaInstance } from '$src/appStore.js';

export const csr = true;
export const prerender = false;

export async function load({ fetch }) {
  const res = await maculaInstance.me(fetch);
  return { ...res };
}
