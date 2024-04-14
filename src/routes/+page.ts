import { maculaInstance } from '$src/appStore';

export async function load({ fetch, parent, params }) {
  await parent();
  const dirs = await maculaInstance.getDirs(fetch);
  let photos = [];
  await Promise.all(
    dirs.map(async (dir) => {
      if (dir.name !== 'woss-photo') {
        return;
      }
      const d = await maculaInstance.getPhotos(dir.pathCid, fetch);
      photos = d.data.files;
    })
  );

  return {
    dir: dirs[0],
    photos
  };
}
