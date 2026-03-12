import type { PageServerLoad } from './$types';
import { getDirectoryFiles } from '$lib/server/macula';

const MACULA_BASE = 'http://127.0.0.1:3007';

export const load: PageServerLoad = async ({ params, url }) => {
	const { unifiedId } = params;
	const fromAlbum = url.searchParams.get('from');
	
	const [fileRes, albumFilesRes] = await Promise.all([
		fetch(`${MACULA_BASE}/${unifiedId}.json`),
		fromAlbum ? getDirectoryFiles(fromAlbum, 1) : Promise.resolve({ files: [], nextPage: null })
	]);
	
	const file = await fileRes.json();
	
	let prevFile = null;
	let nextFile = null;
	
	if (fromAlbum && albumFilesRes.files.length > 0) {
		const allFiles: any[] = [];
		let page = 1;
		let hasMore = true;
		
		while (hasMore && page <= 15) {
			const result = await getDirectoryFiles(fromAlbum, page);
			allFiles.push(...result.files);
			hasMore = result.nextPage !== null;
			page++;
		}
		
		const currentIndex = allFiles.findIndex(f => f.unifiedId === unifiedId);
		
		if (currentIndex > 0) {
			prevFile = allFiles[currentIndex - 1];
		}
		if (currentIndex >= 0 && currentIndex < allFiles.length - 1) {
			nextFile = allFiles[currentIndex + 1];
		}
	}
	
	return {
		file,
		fromAlbum,
		prevFile,
		nextFile
	};
};
