<script>
  import { imageProcessingBaseUrl } from '$src/appStore';
</script>

<div class="navbar bg-base-100 shadow-xl rounded-box">
  <div class="flex-1">
    <button class="btn btn-ghost normal-case text-xl">Portfolio</button>
  </div>
  <div class="flex-none gap-2">
    <div class="dropdown dropdown-end">
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <!-- svelte-ignore a11y-label-has-associated-control -->
      <label tabindex="0" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
          <img
            src="{imageProcessingBaseUrl}/ipfs/bafybeig4k7sjcqwswcdlrepi6ohqhdchyrb6k3klmasijghqkimtyiqkeq"
            alt="Woss avatar"
          />
        </div>
      </label>
    </div>
  </div>
</div>
