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
