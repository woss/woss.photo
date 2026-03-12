<script lang="ts">
	import type { PageData } from './$types';
	
	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>woss.photo - Photo Gallery</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="mb-8">
		<h1 class="text-3xl font-bold mb-2">Albums</h1>
		<p class="text-gray-400">Browse photo collections</p>
	</div>

	{#if data.albums.length === 0}
		<div class="text-center py-12">
			<p class="text-gray-400">No albums found</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			{#each data.albums as album}
				<a
					href="/album/{album.pathCid}"
					class="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-purple-500/10"
				>
					<div class="aspect-square bg-gray-800 relative overflow-hidden">
						<div class="absolute inset-0 flex items-center justify-center">
							<svg class="w-16 h-16 text-gray-600 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
						</div>
						<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
					</div>
					<div class="p-4">
						<h3 class="font-semibold text-lg mb-1 group-hover:text-purple-400 transition-colors">{album.name}</h3>
						<p class="text-sm text-gray-400">{album.fileCount} photos</p>
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>
