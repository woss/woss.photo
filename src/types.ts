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

export interface IPhotoRendition {
  /**
   * Anagolay Workflow CID
   */
  cid: string;
  ipfsCid: string;
  height: number;
  width: number;
  mime: string;
}

export interface IPhotoModel {
  /**
   * Anagolay Workflow CID
   */
  cid: string;
  ipfsCid: string;
  metadataCid: string;
  metadata: Record<string, unknown>;
  renditions: IPhotoRendition[];
  createdAt: number;
  height: number;
  width: number;
}
