import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getDirectoryFiles } from '$lib/server/macula';

export const GET: RequestHandler = async ({ params, url }) => {
	const pathCid = params.pathCid;
	const page = parseInt(url.searchParams.get('page') || '1', 10);
	
	const result = await getDirectoryFiles(pathCid, page);
	
	return json({
		files: result.files,
		nextPage: result.nextPage
	});
};
