import { Type, type Static, type TSchema } from '@sinclair/typebox';
import type { licensesList } from './appStore';

export const ExternalLink = Type.Object({
  name: Type.String(),
  value: Type.String()
});

export const Me = Type.Object({
  name: Type.String(),
  nickname: Type.String(),
  externalLinks: Type.Array(ExternalLink),
  bio: Type.String(),
  avatar: Type.String()
});

export const Dir = Type.Object({
  _count: Type.Number(),
  _link: Type.String(),
  allowFrom: Type.Array(Type.String()),
  createdAt: Type.String(),
  imageOptimizationEnabled: Type.Boolean(),
  name: Type.String(),
  pathCid: Type.String(),
  restrictFrom: Type.Array(Type.String()),
  videoTranscodingEnabled: Type.Boolean()
});

/**
 * use this type with the {@link licenseList} variable
 */
export type ILicensesList = typeof licensesList;
export type ILicenseList = keyof typeof licensesList;

export const DirPubInfo = Type.Object({
  _count: Type.Number(),
  _link: Type.String(),
  name: Type.String(),
  allowFrom: Type.Array(Type.String()),
  restrictFrom: Type.Array(Type.String()),
  imageOptimizationEnabled: Type.Boolean(),
  videoTranscodingEnabled: Type.Boolean(),
  createdAt: Type.String(),
  pathCid: Type.String()
});

export const NicknameInfo = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  nickname: Type.String(),
  bio: Type.String(),
  avatar: Type.String()
});

/**
 * Full JSON structure for the nickname response
 */
export const MePubInfo = Type.Object({
  name: Type.String(),
  nickname: Type.String(),
  bio: Type.String(),
  avatar: Type.String(),
  externalLinks: Type.Array(
    Type.Object({
      name: Type.String(),
      value: Type.String()
    })
  )
});
/**
 * Full JSON structure for the nickname response with dirs and me
 */
export const PubNickInfo = Type.Object({
  dirs: Type.Array(DirPubInfo),
  me: MePubInfo
});
export type IPubNickInfo = Static<typeof PubNickInfo>;

export const NicknameResponse = Type.Object({
  data: PubNickInfo
});

export type IVideoPoster = {
  height: number;
  width: number;
  mime: string;
  ipfsCid: string;
};

export type FileResponse = {
  unifiedId: string;
  extras: Record<string, unknown>;
  restrictFrom: string[];
  allowFrom: string[];
  license: ILicenseList;
  imageOptimizationEnabled: boolean;
  videoTranscodingEnabled: boolean;
  ipfsCid: string;
  publishedAt: string;
  dataMining: string;
  rendition: {
    cid: string;
    ipfsCid: string;
    width: number;
    height: number;
    size: number;
    mime: string;
    image: {
      createdAt: string;
      fileName: string;
      title: string;
      description: string;
      keywords: string[];
      unifiedId: string;
      image: boolean;
      video: boolean;
      mime: string;
      size: number;
      directory: {
        pathCid: string;
      };
    };
  } | null;
  file: {
    createdAt: string;
    fileName: string;
    title: string;
    description: string;
    keywords: string[];
    unifiedId: string;
    image: boolean;
    video: boolean;
    mime: string;
    size: number;
    width: number;
    height: number;
    directory: {
      pathCid: string;
    };
    videoPoster: IVideoPoster | null;
    videoThumbnail: { ipfsCid: string; mime: string }[];
  } | null;
  dataMiningFull: string;
};

export type CachedData = UnilinkCacheItem & { handlers: Record<string, string> };

export interface IExternalLink {
  name: string;
  value: string;
}
export interface ISubtitles {
  ipfsCid: string;
  language: string;
  languageIso: string;
}
export interface IAudioAssets {
  ipfsCid: string;
  language: string;
  languageIso: string;
}

export interface IAssets {
  poster: string;
  thumbnails?: string[];
  subtitles?: ISubtitles[];
  audio?: IAudioAssets[];
}
export interface UnilinkCacheItem {
  imageOptimizationEnabled: boolean;
  unifiedId: string;
  appliedTransformations?: Record<string, string | number>;
  videoTranscodingEnabled: boolean;
  title: string;
  description: string;
  creator: string;
  nickname: string;
  dataMining: string;
  dataMiningFull: string;
  ipfsCid: string;
  fileName: string;
  mime: string;
  fileType: 'image' | 'video' | 'audio' | 'generic';
  credit: string;
  licenseShort: string;
  license: string;
  externalLinks: IExternalLink[];
  keywords: string[];
  publishedAt: Date;
  ogImage: {
    ipfsCid: string;
    presetName: string;
  };
  ogImageUrl: string;
  titleWithCreator: string;
  // image related
  width: number;
  height: number;
  aspectRatio?: number;
  imageOrientation?: 'vertical' | 'horizontal';
  assets?: IAssets;
  metadata: Record<string, string | number>;
  _links: {
    base: string;
    raw: string;
    json: string;
    license: string;
    buy: string;
    webStatement: string;
    copyright: string;
    metadata: string;
    cachedRenditions: { url: string; presetName: string }[];
  };
}

export interface CachedRendition {
  ipfsCid: string;
  presetName: string;
}

export interface OgImage {
  ipfsCid: string;
  presetName: string;
}

const GenericDataResponse = <T extends TSchema>(T: T) =>
  Type.Object({
    data: T
  });

export const meResponse = Type.Object({
  me: Me,
  dirs: Type.Array(Dir)
});

const genericMeResponse = GenericDataResponse(meResponse);

export class MaculaPublicApi {
  username: string;
  userBaseUrl: string;
  userJSONUrl: string;
  /**
   * Url string without the `/` at the end
   */
  baseUrl: string;
  constructor(username: string, baseUrl: string = 'https://u.macula.link') {
    this.username = `@${username}`;
    this.baseUrl = baseUrl;
    this.userBaseUrl = `${this.baseUrl}/${this.username}`;
    this.userJSONUrl = `${this.baseUrl}/${this.username}.json`;
  }

  static async init(username: string) {
    return new MaculaPublicApi(username);
  }

  /**
   * IPFS url
   * @param cidOrPath -
   * @returns
   */
  public makeIpfsUrl(cidOrPath: string): URL {
    const u = new URL(`${this.baseUrl}/ipfs/${cidOrPath}`);
    return u;
  }

  /**
   * Make a preset url for given Unilink
   * @param unilinkId -
   * @param preset - `sys_*`
   * @returns
   */
  public makePresetUrl(unilinkId: string, preset: string): URL {
    const u = new URL(`${this.baseUrl}/${unilinkId}?preset=${preset}`);
    return u;
  }

  /**
   *
   * @param fetchClient -
   * @returns
   */
  public async me(fetchClient?: typeof fetch): Promise<Static<typeof meResponse>> {
    let res;
    if (fetchClient) {
      res = await fetchClient(this.userJSONUrl);
    } else {
      res = await fetch(this.userJSONUrl);
    }
    const { data } = (await res.json()) as Static<typeof genericMeResponse>;
    return data;
  }
  /**
   *
   * @param unifiedId -
   * @returns
   */
  public makeUnifiedRawLink(unifiedId: string) {
    return `${this.baseUrl}/${unifiedId}`;
  }

  /**
   *
   * @param fetchClient -
   * @returns
   */
  public async getDirs(fetchClient?: typeof fetch) {
    let res;
    if (fetchClient) {
      res = await fetchClient(this.userJSONUrl);
    } else {
      res = await fetch(this.userJSONUrl);
    }
    const {
      data: { dirs }
    } = await res.json();
    return dirs;
  }

  /**
   *
   * @param dirPathCid -
   * @param fetchClient -
   * @returns
   */
  public async getPhotos(
    options: { pathCid: string; take: number; page?: number },
    fetchClient?: typeof fetch
  ) {
    let res;
    let pathCid = options.pathCid;
    if (!pathCid) {
      throw new Error('id is required');
    }
    let take = options.take || 20;

    const url = new URL(`${this.userBaseUrl}/${pathCid}`);

    url.searchParams.set('show', 'photos');

    if (take) {
      url.searchParams.set('take', take.toString());
    }

    if (options.page) {
      url.searchParams.set('page', options.page.toString());
    }
    if (fetchClient) {
      res = await fetchClient(url);
    } else {
      res = await fetch(url);
    }
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      const text = await res.text();
      throw new Error(text);
    }
  }

  /**
   *
   * @param unifiedId -
   * @param fetchClient -
   * @returns
   */
  public async getUnifiedIdData(unifiedId: string, fetchClient?: typeof fetch): Promise<UnilinkCacheItem> {
    let res;
    if (fetchClient) {
      res = await fetchClient(`${this.baseUrl}/${unifiedId}.json`);
    } else {
      res = await fetch(`${this.baseUrl}/${unifiedId}.json`);
    }
    const data = await res.json();
    return data;
  }
}
