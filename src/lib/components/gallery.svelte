<script lang="ts">
  import type { UnilinkCacheItem } from '$lib/maculaApi';
  import GalleryItem from './galleryItem.svelte';
  export let name: string;
  export let items: UnilinkCacheItem[] = [];
</script>

<div>
  <div class="flex justify-between items-center">
    <h1 class="font-mono p-2">Showing photos in album - {name}</h1>
    <span class="p-2">Showing {items.length} files</span>
  </div>
  <div class="flex flex-row gap-2 flex-wrap">
    {#each items as item (item.unifiedId)}
      <GalleryItem image={item} />
    {/each}
  </div>
</div>
