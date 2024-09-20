<script lang="ts">
  import { maculaInstance } from '$src/appStore';
  import type { UnilinkCacheItem } from '$src/maculaApi';
  import dayjs from 'dayjs';
  import { onMount } from 'svelte';

  export let image: UnilinkCacheItem;

  const { width, height } = image;

  let src = image._links.raw;
  let preloadBlurredImage = maculaInstance.makePresetUrl(image.unifiedId, 'blur').toString();

  let divRef: HTMLDivElement;
  let iRef: HTMLElement;

  const staticHeight = 300;

  onMount(() => {
    if (width && height && divRef) {
      if (iRef) {
        iRef.style.paddingBottom = `${(height / width) * 100}%`;
      }
      divRef.style.width = `${(width * staticHeight) / height}px`;
      divRef.style.flexGrow = `${(width * staticHeight) / height}`;
    }
  });
</script>

<div
  bind:this={divRef}
  style="background-image: url({preloadBlurredImage}); background-repeat: no-repeat; background-size: cover; background-position: center;"
  class="shadow-lg md:transition-transform md:hover:saturate-150 md:hover:ease-in-out m-0.5 relative"
>
  <div>
    <i bind:this={iRef} class="block"> </i>
    <a href="/photo/{image.unifiedId}">
      <img
        loading="lazy"
        srcset="{src}?preset=sys_md 1x"
        {src}
        alt={image.title}
        class="absolute top-0 w-full align-bottom h-full object-cover"
      />
      <div class="flex flex-col opacity-0 hover:opacity-100 duration-300 absolute inset-0 z-10">
        <span class="bg-slate-400/90 w-full p-2 text-white font-semibold text-[1vw] md:text-sm">
          {image.title || image.fileName}
        </span>
        <div class="bottom-0 absolute bg-base-300 w-full flex items-center h-7 p-2">
          <!-- <Link class="btn btn-ghost btn-sm" external href="{baseUrl}/" title="Buy Image">
              <Icon src="{ShoppingCart}" class="w-[1vw] md:w-4" />
            </Link> -->
          <div>
            {#if image.publishedAt}
              {dayjs(image.publishedAt).format('DD-MM-YYYY')}
            {/if}
          </div>
          <div class="right-2 absolute text-[1vw] md:text-sm">
            {#if image.license}
              <!-- content here -->
              {image.license.toLocaleUpperCase()}
            {/if}
          </div>
        </div>
      </div>
    </a>
  </div>
</div>
