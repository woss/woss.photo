<script lang="ts">
  import { maculaInstance } from '$lib/appStore';
  import Gallery from '$lib/components/gallery.svelte';
  import Navbar from '$lib/components/navbar.svelte';
  import { infiniteScroll } from '$lib/infiniteScroll';
  import type { UnilinkCacheItem } from '$lib/maculaApi';
  import { captureException } from '@sentry/browser';
  import { isNil } from 'ramda';
  import { onMount } from 'svelte';
  import SvelteSeo from 'svelte-seo';
  import type { PageData } from './$types';

  export let data: PageData;
  const take = data.take;

  let name: string = data.dir.name;
  let photos: UnilinkCacheItem[] = data.photos;

  let page: number = data.page;

  let loading = false;
  let loadMore = true;
  let elementRef: any = null;

  async function fetchData() {
    if (loading) {
      return;
    }
    loading = true;
    try {
      const res = await maculaInstance.getPhotos({
        pathCid: data.dir.pathCid,
        take,
        page
      });

      if (res.data.files.length === 0) {
        loadMore = false;
        loading = false;
        return;
      }

      page = res.nextPage;
      photos = [...photos, ...res.data.files];

      loading = false;

      if (isNil(page)) {
        loadMore = false;
      }
    } catch (error) {
      captureException(error);
      loading = false;
    }
  }

  function load() {
    setTimeout(() => {
      fetchData();
    }, 300);
  }

  onMount(async () => {
    // await fetchData();
  });

  $: {
    if (elementRef) {
      infiniteScroll({ fetch: load, element: elementRef });
    }
  }
</script>

<SvelteSeo title="{data.me.name} Portfolio" description={data.me.bio} />

<div class="container mx-auto">
  <Navbar data={data.me} />
  <div class="p-4">
    <Gallery items={photos} {name} />
  </div>
</div>
{#if loadMore}
  <div class="h-16 my-3 w-full flex items-center justify-center flex-col gap-2" bind:this={elementRef}>
    <div>Powered by Macula</div>
    {#if !loading}
      <div class="loading w-5 h-5"></div>
    {/if}
  </div>
{/if}
