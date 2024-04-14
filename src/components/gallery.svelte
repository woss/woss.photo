<script lang="ts">
  import type { Photo } from '$src/types';
  import GalleryItem from './galleryItem.svelte';
  export let name: string;
  export let items: Photo[] = [];
</script>

<div>
  <h1 class="font-mono p-2">Showing photos in album - {name}</h1>
  <div class="flex flex-row gap-2 flex-wrap">
    {#each items as item}
      <GalleryItem image={item} />
    {/each}
  </div>
</div>
