<script lang="ts">
  import { page } from '$app/stores';
  import { captureException } from '@sentry/browser';
  import { onMount } from 'svelte';

  const emojis: Record<number, string> = {
    401: '',
    420: '🫠',
    404: '¯\\_(ツ)_/¯',
    500: '💥'
  };

  let status: number;
  let message: string;

  onMount(() => {
    captureException($page.error?.message, { extra: { ...$page.error } });
  });

  $: status = $page.error?.status || $page.status;
  $: message = $page.error ? message : '';
  // eslint-disable-next-line no-console
  $: console.log('error.svelte', $page);
</script>

{#if status === 404}
  <div class="flex items-center justify-center h-screen flex-col">
    <h1 class="text-lg text-red-500">404</h1>
    <h1 class="p-4">
      {message || 'Not found'}
    </h1>
    <span style="font-size: 10em">
      {emojis[404]}
    </span>
  </div>
{:else}
  <div class="flex items-center justify-center h-screen flex-col">
    <h1 class="text-lg text-red-500">{status}</h1>
    <h1 class="p-4">
      {message || 'Dang!'}
    </h1>
    <span style="font-size: 10em">
      {emojis[status] || '🤷‍♂️'}
    </span>
  </div>
{/if}
