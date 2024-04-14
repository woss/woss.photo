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
  fileName: string;
  title: string;
  description: string;
  keywords: string[];
  mime: string;
  image: boolean;
  video: boolean;
  cid: string;
  ipfsCid: string;
  width: number;
  height: number;
  size: number;
  extras: null;
  unifiedId: string;
  restrictFrom: string[];
  allowFrom: string[];
  license: string;
  imageOptimizationEnabled: boolean;
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
