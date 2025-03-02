<script lang="ts">
  import { maculaInstance } from '$lib/appStore';
  import type { Me } from '$lib/maculaApi';
  import type { Static } from '@sinclair/typebox';
  import { isEmpty, isNil, prop } from 'ramda';
  import { fade } from 'svelte/transition';

  export let data: Static<typeof Me>;
  let avatar = '';
  if (!isNil(prop('avatar', data))) {
    avatar = maculaInstance.makeIpfsUrl(data.avatar).toString();
  }
</script>

<div class="navbar bg-base-100 shadow-xl rounded-box">
  <div class="flex-1">
    <button class="btn btn-ghost normal-case text-xl">{data.name}'s Portfolio</button>
  </div>
  <div class="flex-none gap-2">
    <div class="dropdown dropdown-end">
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          {#if !isEmpty(avatar)}
            <img transition:fade src={avatar} alt="Woss avatar" loading="lazy" />
          {:else}
            <div class="w-full h-full bg-green-700"></div>
          {/if}
        </div>
      </label>
    </div>
  </div>
</div>
