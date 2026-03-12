import type { PageServerLoad } from './$types';
import { getDirectoryFiles, getUserDirectories } from '$lib/server/macula';

export const load: PageServerLoad = async ({ params, url }) => {
	const { pathCid } = params;
	const page = parseInt(url.searchParams.get('page') || '1', 10);
	
	const [filesResult, directories] = await Promise.all([
		getDirectoryFiles(pathCid, page),
		getUserDirectories('woss')
	]);

	const album = directories.find(d => d.pathCid === pathCid);

	return {
		album: {
			pathCid,
			name: album?.name || 'Untitled Album'
		},
		files: filesResult.files,
		nextPage: filesResult.nextPage
	};
};
