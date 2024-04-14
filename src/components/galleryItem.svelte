<script lang="ts">
  import { makeIpfsUrl } from '$src/appStore';
  import type { Photo } from '$src/types';

  export let image: Photo;
  const { width, height } = image;
  let src = `${image._links.raw}?preset=sys_md`;
  let preloadBlurredImage = makeIpfsUrl(image.cachedRenditions.find((x) => x.presetName === 'blur').ipfsCid);

  const maxHeight = 300;

  // item width
  const calculatedWidth = (width * maxHeight) / height;
</script>

<figure
  style="padding-bottom:{image.height /
    (image.width *
      100)}%; width:{calculatedWidth}px; flex-grow:{calculatedWidth}; background-image: url({preloadBlurredImage}); background-repeat: no-repeat; background-size: cover; background-position: center;"
  class="shadow-lg md:transition-transform md:hover:saturate-150 md:hover:ease-in-out"
>
  <div class="w-full rounded-lg flex">
    <a href="/photo/{image.unifiedId}" class="m-0 p-0 flex w-full">
      <img
        {src}
        loading="lazy"
        alt={image.title}
        height={maxHeight - 38}
        width={calculatedWidth}
        class="object-contain grow w-full"
        style="max-height: {maxHeight - 38}px;"
      />
    </a>
  </div>
  <figcaption class="bg-base-300 flex items-center justify-between h-9 p-2">
    <span class="">
      {image.license}
    </span>
  </figcaption>
</figure>
