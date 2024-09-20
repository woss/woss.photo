import { maculaInstance } from '$src/appStore.js';

export async function load({ params, fetch }) {
  const info = await maculaInstance.getUnifiedIdData(params.unifiedId, fetch);
  return { info };
}
