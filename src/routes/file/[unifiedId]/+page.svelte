<script lang="ts">
	import type { PageData } from './$types';
	
	let { data }: { data: PageData } = $props();
	
	let file = $derived(data.file);
	let fromAlbum = $derived(data.fromAlbum);
	let prevFile = $derived(data.prevFile);
	let nextFile = $derived(data.nextFile);
	
	const presets = [
		{ name: 'sys_sm', width: 500 },
		{ name: 'sys_md', width: 900 },
		{ name: 'sys_lg', width: 1200 },
		{ name: 'sys_xl', width: 2048 },
		{ name: 'sys_2xl', width: 4096 },
	];

	function getSrcSet() {
		return presets
			.map(p => `${file._links?.raw}?preset=${p.name} ${p.width}w`)
			.join(', ');
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'ArrowLeft' && prevFile) {
			window.location.href = `/file/${prevFile.unifiedId}?from=${fromAlbum}`;
		} else if (e.key === 'ArrowRight' && nextFile) {
			window.location.href = `/file/${nextFile.unifiedId}?from=${fromAlbum}`;
		}
	}
	</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
	<title>{file.title} - woss.photo</title>
	<meta property="og:title" content={file.title} />
	<meta property="og:image" content={file.ogImageUrl} />
	<meta property="og:description" content={file.description || file.titleWithCreator} />
</svelte:head>

<main class="max-w-7xl mx-auto px-4 py-8">
	<div class="mb-6">
		<a href={fromAlbum ? `/album/${fromAlbum}` : '/'} class="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-2">
			<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			{fromAlbum ? 'Back to Album' : 'Back to Albums'}
		</a>
	</div>

	<div class="flex flex-col lg:flex-row gap-8">
		<div class="flex-1 space-y-4">
			<div class="flex justify-between items-center">
				{#if prevFile}
					<a
						href="/file/{prevFile.unifiedId}?from={fromAlbum}"
						class="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
					>
						<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
						</svg>
						Previous
					</a>
				{:else}
					<div></div>
				{/if}
				
				{#if nextFile}
					<a
						href="/file/{nextFile.unifiedId}?from={fromAlbum}"
						class="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white transition-colors"
					>
						Next
						<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
						</svg>
					</a>
				{/if}
			</div>
			
			<div class="bg-gray-900 rounded-xl overflow-hidden" style="max-height: calc(100vh - 200px); aspect-ratio: {file.width} / {file.height};">
				<img
					src="{file._links?.raw}?preset=sys_xl"
					srcset={getSrcSet()}
					sizes="(max-width: 1024px) 100vw, 60vw"
					alt={file.title}
					class="w-full h-full object-contain"
				/>
			</div>
		</div>

		<div class="w-full lg:w-80 shrink-0 space-y-6">
			<div>
				<h1 class="text-2xl font-bold mb-2">{file.title}</h1>
				{#if file.description}
					<p class="text-gray-400">{file.description}</p>
				{/if}
			</div>

			{#if file.keywords?.length > 0}
				<div>
					<h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Keywords</h2>
					<div class="flex flex-wrap gap-2">
						{#each file.keywords as keyword}
							<span class="px-3 py-1 bg-purple-600/20 text-purple-400 rounded-full text-sm">
								{keyword}
							</span>
						{/each}
					</div>
				</div>
			{/if}

			{#if file.metadata}
				<div>
					<h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Camera Info</h2>
					<dl class="space-y-2 text-sm">
						{#if file.metadata.cameraMake || file.metadata.cameraModel}
							<div class="flex justify-between">
								<dt class="text-gray-500">Camera</dt>
								<dd>{file.metadata.cameraMake} {file.metadata.cameraModel}</dd>
							</div>
						{/if}
						{#if file.metadata.lensModel}
							<div class="flex justify-between">
								<dt class="text-gray-500">Lens</dt>
								<dd>{file.metadata.lensModel}</dd>
							</div>
						{/if}
						{#if file.metadata.focal}
							<div class="flex justify-between">
								<dt class="text-gray-500">Focal Length</dt>
								<dd>{file.metadata.focal}mm</dd>
							</div>
						{/if}
						{#if file.metadata.aperture}
							<div class="flex justify-between">
								<dt class="text-gray-500">Aperture</dt>
								<dd>f/{file.metadata.aperture}</dd>
							</div>
						{/if}
						{#if file.metadata.shutter}
							<div class="flex justify-between">
								<dt class="text-gray-500">Shutter</dt>
								<dd>1/{Math.round(1/file.metadata.shutter)}s</dd>
							</div>
						{/if}
						{#if file.metadata.iso}
							<div class="flex justify-between">
								<dt class="text-gray-500">ISO</dt>
								<dd>{file.metadata.iso}</dd>
							</div>
						{/if}
					</dl>
				</div>
			{/if}

			<div>
				<h2 class="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">Details</h2>
				<dl class="space-y-2 text-sm">
					<div class="flex justify-between">
						<dt class="text-gray-500">Dimensions</dt>
						<dd>{file.width} × {file.height}</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-gray-500">File Size</dt>
						<dd>{(file.size / 1024 / 1024).toFixed(2)} MB</dd>
					</div>
					<div class="flex justify-between">
						<dt class="text-gray-500">License</dt>
						<dd>{file.licenseShort || file.license}</dd>
					</div>
					{#if file.creator}
						<div class="flex justify-between">
							<dt class="text-gray-500">Creator</dt>
							<dd>{file.creator}</dd>
						</div>
					{/if}
				</dl>
			</div>

			<div class="pt-4 border-t border-gray-800">
				<a
					href={file._links?.base || '#'}
					target="_blank"
					rel="noopener noreferrer"
					class="block w-full text-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
				>
					View on Macula
				</a>
			</div>
		</div>
	</div>
</main>
