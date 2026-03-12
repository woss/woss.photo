<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import type { PageData } from './$types';
	
	let { data }: { data: PageData } = $props();
	
	let searchQuery = $state(browser ? $page.url.searchParams.get('q') || '' : '');
	let sortBy = $state<'date' | 'title'>('date');
	let sortOrder = $state<'asc' | 'desc'>('desc');
	let selectedPhoto = $state<number | null>(null);
	let currentPage = $state(1);
	let loading = $state(false);
	let allFiles = $state<typeof data.files>(data.files);
	let hasMore = $state(data.nextPage !== null);

	$effect(() => {
		if (browser) {
			const q = $page.url.searchParams.get('q');
			searchQuery = q || '';
		}
	});

	$effect(() => {
		allFiles = [...data.files];
		currentPage = 1;
		hasMore = data.nextPage !== null;
	});

	$effect(() => {
		const url = new URL(window.location.href);
		if (searchQuery.trim()) {
			url.searchParams.set('q', searchQuery);
		} else {
			url.searchParams.delete('q');
		}
		if (url.toString() !== window.location.href) {
			goto(url.toString(), { replaceState: true, keepFocus: true, noScroll: true });
		}
	});

	function getDisplayedFiles() {
		if (!searchQuery.trim()) {
			return allFiles;
		}
		
		const query = searchQuery.toLowerCase();
		return allFiles.filter(file => 
			file.title.toLowerCase().includes(query) ||
			(file.description?.toLowerCase().includes(query)) ||
			file.keywords.some((k: string) => k.toLowerCase().includes(query))
		);
	}

	$effect(() => {
		if (searchQuery.trim() && hasMore && !loading) {
			loadMore();
		}
	});

	let displayedFiles = $derived(getDisplayedFiles());

	$effect(() => {
		if (!hasMore || loading) return;
		
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && !loading && hasMore) {
				loadMore();
			}
		}, { rootMargin: '200px' });
		
		const trigger = document.getElementById('load-trigger');
		if (trigger) {
			observer.observe(trigger);
		}
		
		return () => observer.disconnect();
	});

	let loadingMore = false;

	async function loadMore() {
		if (loadingMore || loading || !hasMore) return;
		
		loadingMore = true;
		loading = true;
		
		const nextPageNum = page + 1;
		
		const response = await fetch(`/api/album/${data.album.pathCid}?page=${nextPageNum}`);
		const newData = await response.json();
		console.log('Loaded page', nextPageNum, newData);
		
		if (newData.files && newData.files.length > 0) {
			allFiles = [...allFiles, ...newData.files];
			currentPage = nextPageNum;
			hasMore = newData.nextPage !== null;
		} else {
			hasMore = false;
		}
		
		loading = false;
		setTimeout(() => { loadingMore = false; }, 100);
	}

	function openLightbox(index: number) {
		selectedPhoto = index;
	}

	function closeLightbox() {
		selectedPhoto = null;
	}

	function nextPhoto(e: Event) {
		e.stopPropagation();
		if (selectedPhoto !== null && selectedPhoto < displayedFiles.length - 1) {
			selectedPhoto++;
		}
	}

	function prevPhoto(e: Event) {
		e.stopPropagation();
		if (selectedPhoto !== null && selectedPhoto > 0) {
			selectedPhoto--;
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (selectedPhoto === null) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowRight') nextPhoto(e);
		if (e.key === 'ArrowLeft') prevPhoto(e);
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
	<title>{data.album.name} - woss.photo</title>
</svelte:head>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
	<div class="mb-6">
		<a href="/" class="text-purple-400 hover:text-purple-300 transition-colors inline-flex items-center gap-2">
			<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Back to Albums
		</a>
	</div>

	<div class="mb-8">
		<h1 class="text-3xl font-bold mb-2">{data.album.name}</h1>
		<p class="text-gray-400">{allFiles.length} photos</p>
	</div>

	<div class="mb-6 flex flex-col sm:flex-row gap-4">
		<div class="relative flex-1">
			<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
			</svg>
			<input
				type="text"
				placeholder="Search photos..."
				bind:value={searchQuery}
				class="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
			/>
		</div>
		
		<div class="flex gap-2">
			<select
				bind:value={sortBy}
				class="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-purple-500"
			>
				<option value="date">Sort by Date</option>
				<option value="title">Sort by Title</option>
			</select>
			
			<button
				type="button"
				onclick={() => sortOrder = sortOrder === 'desc' ? 'asc' : 'desc'}
				class="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-colors"
				aria-label={sortOrder === 'desc' ? 'Sort descending' : 'Sort ascending'}
			>
				{#if sortOrder === 'desc'}
					<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
					</svg>
				{:else}
					<svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
					</svg>
				{/if}
			</button>
		</div>
	</div>

	{#if displayedFiles.length === 0}
		<div class="text-center py-12">
			<p class="text-gray-400">No photos found</p>
		</div>
	{:else}
		{#if searchQuery.trim() && hasMore}
			<p class="text-gray-400 text-sm mb-4">Searching... ({displayedFiles.length} results so far)</p>
		{/if}
		<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
			{#each displayedFiles as file, index}
				<a
				href="/file/{file.unifiedId}?from={data.album.pathCid}"
					type="button"
					class="aspect-square bg-gray-900 rounded-lg overflow-hidden cursor-pointer group relative"
				>
				<img
							src="{file._links.raw}?preset=sys_md"
							alt={file.title}
							class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
							loading="lazy"
						/>
					
					<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
						<p class="text-white text-sm font-medium truncate">{file.title}</p>
					</div>
				</a>
			{/each}
		</div>
		
	{#if !searchQuery && hasMore}
		<div id="load-trigger" class="h-20 flex items-center justify-center">
			{#if loading}
				<p class="text-gray-400">Loading more photos...</p>
			{/if}
		</div>
	{/if}
	{/if}
</div>

{#if selectedPhoto !== null}
	<!-- svelte-ignore a11y_click_events_have_key_events a11y_interactive_supports_focus -->
	<div
		class="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
		onclick={closeLightbox}
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<button
			type="button"
			class="absolute top-4 right-4 text-white/70 hover:text-white p-2"
			onclick={closeLightbox}
			aria-label="Close lightbox"
		>
			<svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>

	{#if selectedPhoto > 0}
		<button
			type="button"
			class="absolute left-4 text-white/70 hover:text-white p-2"
			onclick={prevPhoto}
			aria-label="Previous photo"
		>
			<svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
		</button>
	{/if}

	{#if selectedPhoto < displayedFiles.length - 1}
		<button
			type="button"
			class="absolute right-4 text-white/70 hover:text-white p-2"
			onclick={nextPhoto}
			aria-label="Next photo"
		>
			<svg class="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	{/if}

		{#if displayedFiles[selectedPhoto]}
			{@const file = displayedFiles[selectedPhoto]}
			<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
			<div class="max-w-[90vw] max-h-[90vh]" onclick={(e) => e.stopPropagation()} role="presentation">
				{#if file._links.raw}
					<img
						src="{file._links.raw}?preset=sys_orig"
						alt={file.title}
						class="max-w-full max-h-[90vh] object-contain"
					/>
				{/if}
				<div class="text-white text-center mt-4">
					<h2 class="text-xl font-semibold">{file.title}</h2>
					{#if file.dateTimeTaken}
						<p class="text-gray-400 text-sm mt-1">
							{new Date(file.dateTimeTaken).toLocaleDateString('en-US', {
								year: 'numeric',
								month: 'long',
								day: 'numeric'
							})}
						</p>
					{/if}
					{#if file.keywords.length > 0}
						<div class="flex flex-wrap justify-center gap-2 mt-3">
							{#each file.keywords as keyword}
								<span class="px-2 py-1 bg-white/10 rounded text-xs">{keyword}</span>
							{/each}
						</div>
					{/if}
				</div>
			</div>
		{/if}

		<div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm">
			{selectedPhoto + 1} / {displayedFiles.length}
		</div>
	</div>
{/if}
