<script lang="ts">
  import { imageProcessingBaseUrl, albums } from '$src/appStore';
  import Gallery from '$src/components/gallery.svelte';
  import Navbar from '$src/components/navbar.svelte';
  import type { IAlbumDBSchema, Photo } from '$src/types';
  import axios from 'axios';
  import { onMount } from 'svelte';
  import { isEmpty } from 'ramda';

  let name: keyof typeof albums = 'home';

  let photos: Photo[] = [];

  onMount(async () => {
    const albumCid = albums[name].cid;
    const url = `${imageProcessingBaseUrl}/album/${albumCid}`;

    const { data } = await axios.get<{ data: IAlbumDBSchema; totalPhotos: number }>(url);
    photos = data.data.photos;
    name = data.data.name as keyof typeof albums;
  });
</script>

<div class="container mx-auto">
  <Navbar />
  <div class="p-4">
    {#if !isEmpty(photos)}
      <Gallery items={photos} {name} />
    {:else}
      <div>no images</div>
    {/if}
  </div>
</div>
