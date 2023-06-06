<script lang="ts">
  import { makeIpfsLinkForUrn } from '$src/appStore';
  import type { Photo } from '$src/types';
  import { onMount } from 'svelte';

  export let image: Photo;
  let src = '';
  let preloadBlurredImage = '';

  const maxHeight = 300;

  // item width
  let calculatedWidth = 300;

  onMount(() => {
    // this serves as a nice placeholder
    preloadBlurredImage = makeIpfsLinkForUrn(image.renditions.blur).toString();

    const { width, height } = image.renditions;

    calculatedWidth = (width * maxHeight) / height;

    src = makeIpfsLinkForUrn(image.renditions['600'], {
      fit: 'cover'
    }).toString();
  });
</script>

<div
  style="padding-bottom:{image.renditions.height /
    (image.renditions.width *
      100)}%; width:{calculatedWidth}px; flex-grow:{calculatedWidth}; background-image: url('{preloadBlurredImage}'); background-repeat: no-repeat; background-size: cover; background-position: center;"
  class="w-full rounded-lg flex"
>
  <a href="/photo/{image.cid}" class="m-0 p-0 flex w-full">
    <img
      {src}
      loading="lazy"
      alt={image.name}
      height={maxHeight}
      width={calculatedWidth}
      class="rounded-lg object-fill grow h-[{maxHeight}px] shadow-lg md:transition-transform md:hover:saturate-150 md:hover:ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
      srcset=""
    />
  </a>
</div>
