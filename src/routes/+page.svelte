<script lang="ts">
  import Gallery from '$src/components/gallery.svelte';
  import Navbar from '$src/components/navbar.svelte';
  import type { Photo } from '$src/types';
  import { isEmpty } from 'ramda';
  import { onMount } from 'svelte';
  import SvelteSeo from 'svelte-seo';
  import type { PageData } from './$types';

  export let data: PageData;

  let name: string = data.dir.name;
  let photos: Photo[] = data.photos;

  onMount(async () => {});
</script>

<SvelteSeo title="{data.me.name} Portfolio" description={data.me.bio} />

<div class="container mx-auto">
  <Navbar data={data.me} />
  <div class="p-4">
    {#if !isEmpty(photos)}
      <Gallery items={photos} {name} />
    {:else}
      <div>no images</div>
    {/if}
  </div>
</div>
