export interface MaculaFile {
	unifiedId: string;
	title: string;
	fileName: string;
	description: string | null;
	mime: string;
	width: number;
	height: number;
	dateTimeTaken: string;
	keywords: string[];
	license: string;
	size: number;
	image: boolean;
	video: boolean;
	ipfsCid: string | null;
	publishedAt: string;
	_links: {
		base: string;
		json: string;
		raw: string;
		copyright: string;
		license: string;
		webStatement: string;
		cachedRenditions: Array<{
			presetName: string;
			url: string;
		}>;
	};
}

export interface MaculaDirectory {
	name: string;
	pathCid: string;
	fileCount: number;
	link: string;
}

export interface DirectoryResponse {
	files: MaculaFile[];
	nextPage: number | null;
	total: number;
}

const MACULA_BASE = 'http://127.0.0.1:3007';

const DIRECTORIES: MaculaDirectory[] = [
	{
		name: 'woss-photo',
		pathCid: 'bafkr4ift7ewmyiyvzz2lwnan242t6whcaebjwmyby5jy2hzozg6qh6whqe',
		fileCount: 204,
		link: `${MACULA_BASE}/@woss/bafkr4ift7ewmyiyvzz2lwnan242t6whcaebjwmyby5jy2hzozg6qh6whqe`
	},
	{
		name: 'stars',
		pathCid: 'bafkr4igs2y3diivyncuxiiije7zyqo4xt4a2gsagnd2ksbddepwkytwf5u',
		fileCount: 5,
		link: `${MACULA_BASE}/@woss/bafkr4igs2y3diivyncuxiiije7zyqo4xt4a2gsagnd2ksbddepwkytwf5u`
	},
	{
		name: 'vukovar',
		pathCid: 'bafkr4ic4cvbqeqn5wkvsfusbvneirkvlk2cbifwrapnjaqzjjtteisxvjm',
		fileCount: 7,
		link: `${MACULA_BASE}/@woss/bafkr4ic4cvbqeqn5wkvsfusbvneirkvlk2cbifwrapnjaqzjjtteisxvjm`
	}
];

export async function getUserDirectories(_nickname: string): Promise<MaculaDirectory[]> {
	return DIRECTORIES;
}

export async function getDirectoryFiles(dirPathCid: string, page = 1): Promise<DirectoryResponse> {
	const response = await fetch(`${MACULA_BASE}/@woss/${dirPathCid}?page=${page}`);
	const data = await response.json();
	
	const files: MaculaFile[] = data.data?.files || [];

	const PAGE_SIZE = 20;
	const hasMore = files.length === PAGE_SIZE;

	return {
		files,
		nextPage: hasMore ? page + 1 : null,
		total: files.length
	};
}

export async function getDirectoryInfo(dirPathCid: string): Promise<{ name: string } | null> {
	const response = await fetch(`${MACULA_BASE}/@woss/${dirPathCid}`);
	const data = await response.json();
	
	return data.data?.dir || null;
}
