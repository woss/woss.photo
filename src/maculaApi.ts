import { Type, type Static, type TSchema } from '@sinclair/typebox';

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
  baseUrl: string;
  constructor(username: string) {
    this.username = `@${username}`;
    this.baseUrl = `http://127.0.0.1:3007`;
    this.userBaseUrl = `http://127.0.0.1:3007/${this.username}`;

    this.userJSONUrl = `http://127.0.0.1:3007/${this.username}.json`;
  }

  static async init(username: string) {
    return new MaculaPublicApi(username);
  }

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

  public makeUnifiedRawLink(unifiedId: string, fetchClient?: typeof fetch) {
    return `${this.baseUrl}/${unifiedId}`;
  }
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
  public async getPhotos(dirPathCid: string, fetchClient?: typeof fetch) {
    let res;
    if (fetchClient) {
      res = await fetchClient(`${this.userBaseUrl}/${dirPathCid}`);
    } else {
      res = await fetch(`${this.userBaseUrl}/${dirPathCid}`);
    }
    const data = await res.json();
    return data;
  }
  public async getUnifiedIdData(unifiedId: string, fetchClient?: typeof fetch) {
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
