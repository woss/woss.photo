export interface IAlbumDBSchema {
  _id: string;
  name: string;
  slug: string;
  description: string;
  photos: Photo[];
  userAddress: string;
  createdAt: number;
}

export interface Photo {
  cid: string;
  name: string;
  addedAt: number;
  processed: boolean;
  renditions: Renditions;
}

export interface Renditions {
  '600': string;
  '1000': string;
  '2000': string;
  blur: string;
  original: string;
  width: number;
  height: number;
}
