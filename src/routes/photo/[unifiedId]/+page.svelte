<script lang="ts">
  import { page } from '$app/stores';
  import { maculaInstance, makeIpfsUrl } from '$src/appStore';
  import { fade } from 'svelte/transition';
  import type { PageData } from './$types';

  export let data: PageData;

  let src: string = maculaInstance.makeUnifiedRawLink(`${$page.params.unifiedId}`);
  let preloadBlurredImage = makeIpfsUrl(
    data.info.cachedRenditions.find((x) => x.presetName === 'blur').ipfsCid
  );
  let containerWidth = 0;
  let containerHeight = 0;

  //               style="height:calc(100vw * (9/20));"
</script>

<div
  class="min-h-screen"
  style="background-image: url('{preloadBlurredImage}'); background-repeat: no-repeat; background-size: cover; background-position: center;"
>
  <div class="shadow-xl flex items-center">
    <a href="/" class="btn m-4"> Back </a>
  </div>

  <div
    bind:clientHeight={containerHeight}
    bind:clientWidth={containerWidth}
    class="container mx-auto mt-4 flex items-start w-full justify-between gap-2"
  >
    <!-- image -->
    <div class="w-full">
      <div class="flex items-center justify-center">
        <div style={data.info.imageOrientation === 'vertical' ? 'max-height=80vh; height:80vh;' : ''}>
          <img
            srcset="{src}?w=800 800w, {src}?w=2000 1000w"
            sizes="(min-width: 800px) 80vw, 100vw"
            src="{src}?w=600"
            class="object-contain"
            loading="lazy"
            style="width: 100%; height: 100%;"
            transition:fade={{ delay: 250, duration: 300 }}
            alt={data.info.title}
          />
          <div>
            <div class="flex gap-2 p-2 justify-between bg-base-100">
              <span>
                {data.info.license}
              </span>
              <span>
                {data.info.description || 'No description'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="card bg-base-100 shadow-xl md:min-w-96 md:w-96 w-full rounded-none">
      <div class="card-body">
        <h2 class="card-title">{data.info.title || data.info.fileName || 'Untitled'}</h2>
        <p>{data.info.description || 'No description provided'}</p>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  </div>
</div>
