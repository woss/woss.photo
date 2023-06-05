<script lang="ts">
  import { imageProcessingBaseUrl } from '$src/appStore';
  import type { Photo } from '$src/types';
  import { onMount } from 'svelte';

  export let image: Photo;

  const maxHeight = 200;

  // item width
  let calculatedWidth = 300;

  function onImageLoadend() {
    console.log('loaded image');
  }

  onMount(() => {
    // console.log('thisImage', thisImage);
    const { width, height } = image.renditions;

    calculatedWidth = (width * maxHeight) / height;
  });
</script>

<img
  src="{imageProcessingBaseUrl}/ipfs/{image.renditions['600'].split(':')[2]}?fit=cover"
  loading="lazy"
  style="padding-bottom:{image.renditions.height /
    (image.renditions.width * 100)}%; width:{calculatedWidth}px; flex-grow:{calculatedWidth};
    background-image: url('{imageProcessingBaseUrl}/ipfs/{image.renditions.blur.split(':')[2]}');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    "
  alt={image.name}
  class="rounded-lg object-cover grow m-1 h-[{maxHeight}px] shadow-lg md:transition-transform md:hover:scale-110 md:hover:saturate-150 md:hover:ease-in-out hover:shadow-lg hover:shadow-purple-500/50"
  height={maxHeight}
  width={calculatedWidth}
  on:load={onImageLoadend}
/>
