// 根据env获取api
export const getApiPrefixAccordEnv = (env: 'tb1' | 'tb2' | 'pro') => {
  switch (env) {
    case 'tb1':
      return 'https://api.tb1.sayweee.net/central/bpm';
    case 'tb2':
      return 'https://api.tb1.sayweee.net/central/bpm';
    case 'pro':
      return 'https://api.sayweee.net/central/bpm';
  }
};

// 根据env获取架构api
export const getRSApiPrefixAccordEnv = (env: 'tb1' | 'tb2' | 'pro') => {
  switch (env) {
    case 'tb1':
      return 'https://rs.tb1.sayweee.net';
    case 'tb2':
      return 'https://rs.tb2.sayweee.net';
    case 'pro':
      return 'https://rs.sayweee.net';
  }
};

export const debounce = (fn: (...args: any[]) => void, delay = 800) => {
  let timer: number;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      typeof fn === 'function' && fn(...args);
    }, delay);
  };
};

export const FILE_LOGOS = {
  txt: 'https://cdn.sayweee.net/cs/image/087/921/3D17C4036E590BFF_0x0.png',
  image: 'https://cdn.sayweee.net/cs/image/030/447/47F5570D100BD6B_0x0.png',
  pdf: 'https://cdn.sayweee.net/cs/image/431/590/4CA8155B3B9495BF_0x0.png',
  video: 'https://cdn.sayweee.net/cs/image/688/479/276A5343F14EB58_0x0.png',
  other: 'https://cdn.sayweee.net/cs/image/040/838/1796333A1B5AA392_0x0.png',
};

export const getFileLogo = (fileType: string) => {
  if (!fileType) return;

  if (fileType.endsWith('document')) return FILE_LOGOS.txt;

  if (fileType.endsWith('pdf')) return FILE_LOGOS.pdf;

  if (fileType.endsWith('jpeg') || fileType.endsWith('png')) return FILE_LOGOS.image;

  if (fileType.endsWith('mp4')) return FILE_LOGOS.video;

  return FILE_LOGOS.other;
};

export const getAvatarTxt = (name: string) => {
  const [firstName, secondName] = name?.split('.') || [];

  return `${firstName[0].toLocaleUpperCase()}${secondName[0].toLocaleUpperCase()}`;
};
