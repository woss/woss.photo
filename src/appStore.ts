import { dev } from '$app/environment';
import { equals, split } from 'ramda';

/**
 * local IPFS or img.macula.link
 */
export const imageProcessingBaseUrl = dev ? 'https://img.macula.localhost' : 'https://img.macula.link';
export const defaultIpfsGateway = dev ? 'https://ipfs.macula.localhost' : 'https://ipfs.macula.link';

export const hostingUrl = dev ? 'https://api.macula.localhost' : 'https://api.macula.link';

/**
 *
 * @param urn - `urn:PROVIDER:CID`
 * @returns
 */
export function makeIpfsLinkForUrn(urn: string): string {
  const [, provider, cid] = split(':', urn);
  let ipfsGateway = defaultIpfsGateway;
  if (equals('kelp', provider)) {
    ipfsGateway = defaultIpfsGateway;
  } else {
    throw new Error(`provider ${provider} not found`);
  }

  const u = new URL(`${ipfsGateway}/ipfs/${cid}`);

  return u.toString();
}

export const albums = {
  home: {
    name: 'Home page album',
    cid: '647dbc5f00597505a2e78c14'
    // cid: '647cd0e9621688e9a1dab816'
  }
};
