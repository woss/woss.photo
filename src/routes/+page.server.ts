import type { PageServerLoad } from './$types';
import { getUserDirectories } from '$lib/server/macula';

export const load: PageServerLoad = async () => {
	const directories = await getUserDirectories('woss');
	
	return {
		albums: directories
	};
};
