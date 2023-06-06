<script lang="ts">
  import { page } from '$app/stores';
  import { maculaImageInfoUrl, makeIpfsItemUrl, makeIpfsLinkForUrn } from '$src/appStore';
  import axios from 'axios';
  import { onMount } from 'svelte';
  // import ExifReader from 'exifreader';
  import { isNil } from 'ramda';
  import type { IPhotoModel } from '$src/types';

  let imageLoading = false;
  let src: string;
  let preloadBlurredImage: string;
  let srcSet: { media: string; srcset: string }[] = [];

  onMount(async () => {
    imageLoading = true;
    const {
      data: { data: imageData }
    } = await axios.get<IPhotoModel>(maculaImageInfoUrl($page.params.cid).toString());

    preloadBlurredImage = makeIpfsLinkForUrn(imageData.renditions[0].ipfsCid, { blur: '5' }).toString();
    console.log('preloadBlurredImage', preloadBlurredImage);
    const set = imageData.renditions.map((r) => {
      makeIpfsLinkForUrn(imageData.ipfsCid, {
        fit: 'cover'
      }).toString();
    });

    // const ua = new Uint8Array(imageJsonData.data);
    // const blob = new Blob([ua]);

    // // make the URL
    // const uri = URL.createObjectURL(blob);
    // // assign the blob so we can show image
    // imageSrc = uri;

    // const { Copyright, ...rest } = ExifReader.load(imageJsonData.data.metadata.exif);

    // console.log('image', imageJsonData, rest);
  });
</script>

<div>
  <div
    style="background-image: url('{preloadBlurredImage}'); background-repeat: no-repeat; background-size: cover; background-position: center;"
    class="w-full rounded-lg flex h-96 justify-center items-center"
  >
    {#if imageLoading}
      <div class="loading">loading</div>
    {:else}
      <picture class="w-full rounded-lg flex">
        {#each srcSet as ss}
          <source media={ss.media} srcset={ss.srcset} />
        {/each}
        <img {src} alt="photo 1" />
      </picture>
    {/if}
  </div>
</div>
