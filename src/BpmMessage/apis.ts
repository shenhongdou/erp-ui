import { getApiPrefixAccordEnv, getRSApiPrefixAccordEnv } from '../util';

export const fetchList = async (env: 'tb1' | 'tb2' | 'pro', token: string, params: any) => {
  const response = await fetch(`${getApiPrefixAccordEnv(env)}/task/operator/chatLog/list`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).catch((err) => {
    console.error(err);
  });

  if (!response) return [];

  const data = await response.json();
  return data;
};

export const fetchUsers = async (env: 'tb1' | 'tb2' | 'pro', token: string, params: any) => {
  const response = await fetch(`${getApiPrefixAccordEnv(env)}/admin/upms/sysUser/list`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).catch((err) => {
    console.error(err);
  });

  if (!response) return [];

  const data = await response.json();

  return data;
};

export const doSendMessage = async (env: 'tb1' | 'tb2' | 'pro', token: string, params: any) => {
  console.log(params, 'params');
  const response = await fetch(`${getApiPrefixAccordEnv(env)}/task/operator/chatLog/add`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  }).catch((err) => {
    console.error(err);
  });

  if (!response) return [];

  const data = await response.json();
  return data;
};

export const uploadFile = async (env: 'tb1' | 'tb2' | 'pro', token: string, formData: FormData) => {
  const response = await fetch(`${getRSApiPrefixAccordEnv(env)}/resource/upload`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
      channel: 'central',
      type: 'cs',
      local: 'cs',
    },
    body: formData,
  }).catch((err) => {
    console.error(err);
  });

  if (!response) return [];

  const data = await response.json();

  return data;
};
