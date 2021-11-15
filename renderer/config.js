const DEFAULT_LINKZONE_URL = '192.168.22.1';

export const getLinkZoneUrl = (url) => {
  return `http://${url}/jrd/webapi`;
};

export const linkZoneApiUrl = getLinkZoneUrl(DEFAULT_LINKZONE_URL);
