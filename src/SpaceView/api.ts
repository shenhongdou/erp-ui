import { getApiPrefixAccordEnv } from '../util';
import { ENV } from '../types/global';

export const fetchWekiData =
  ({ url, method = 'POST' }: { url: string; method?: string }) =>
  async ({
    env,
    token,
    wekiToken,
    params,
  }: {
    env: ENV;
    token: string;
    wekiToken: string;
    params: any;
  }) => {
    const response = await fetch(`${getApiPrefixAccordEnv(env, 'cs/desk')}${url}`, {
      method,
      headers: {
        'Weki-Token': wekiToken,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    }).catch((err) => {
      console.error(err);
    });

    if (!response) return null;

    const data = await response.json();
    return data;
  };

export const fetchCategorys = ({
  env,
  token,
  wekiToken,
  params,
}: {
  env: ENV;
  token: string;
  wekiToken: string;
  params: {
    language: string;
  };
}) => {
  return fetchWekiData({ url: '/kb/spaceView/categoryFirstList' })({
    env,
    token,
    wekiToken,
    params,
  });
};

export const fetchSubCategoryOrArticle = ({
  env,
  token,
  wekiToken,
  params,
}: {
  env: ENV;
  token: string;
  wekiToken: string;
  params: {
    language: string;
    categoryId: number;
  };
}) => {
  return fetchWekiData({ url: '/kb/spaceView/articleListByCategoryId' })({
    env,
    token,
    wekiToken,
    params,
  });
};

export const fetchArticleDetail = ({
  env,
  token,
  wekiToken,
  params,
}: {
  env: ENV;
  token: string;
  wekiToken: string;
  params: {
    language: string;
    articleId: number;
  };
}) => {
  return fetchWekiData({ url: '/kb/spaceView/reviewArticle' })({ env, token, wekiToken, params });
};

export const searchArticle = ({
  env,
  token,
  wekiToken,
  params,
}: {
  env: ENV;
  token: string;
  wekiToken: string;
  params: { language: string; keywords: string };
}) => {
  return fetchWekiData({ url: '/kb/spaceView/searchArticle' })({ env, token, wekiToken, params });
};

export const markUseful = ({
  env,
  token,
  wekiToken,
  params,
}: {
  env: ENV;
  token: string;
  wekiToken: string;
  params: { articleId: number };
}) => {
  return fetchWekiData({ url: '/kb/spaceView/useful' })({ env, token, wekiToken, params });
};

export const markUseless = ({
  env,
  token,
  wekiToken,
  params,
}: {
  env: ENV;
  token: string;
  wekiToken: string;
  params: { articleId: number };
}) => {
  return fetchWekiData({ url: '/kb/spaceView/useless' })({ env, token, wekiToken, params });
};
