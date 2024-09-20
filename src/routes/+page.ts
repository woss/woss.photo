import { maculaInstance } from '$src/appStore';
import { error } from '@sveltejs/kit';
import { isEmpty, isNil } from 'ramda';

export async function load({ fetch, parent }) {
  const { dirs } = await parent();
  if (isEmpty(dirs)) {
    throw error(400, 'Nothing to show');
  }

  const take = 20;
  let photos = [];

  // we want only use one directory
  const wossPublishedDir = dirs.find((dir) => dir.name === 'woss-photo');
  if (isNil(wossPublishedDir)) {
    error(400, 'Nothing to show');
  }
  try {
    const d = await maculaInstance.getPhotos(
      {
        pathCid: wossPublishedDir.pathCid,
        take
      },
      fetch
    );

    console.log('d', d);
    // photos = d.data.files;

    return {
      dir: wossPublishedDir,
      photos: [],
      take,
      page: d.nextPage
    };
  } catch (e) {
    console.log('e', e);
    error(400, { message: e.message, status: e.status });
  }
}
