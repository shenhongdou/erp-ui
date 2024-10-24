import { getApiPrefixAccordEnv, getRSApiPrefixAccordEnv } from '../util';

export const fetchList = async (env: 'tb1' | 'dev' | 'pro', token: string, params: any) => {
  const response = await fetch(`${getApiPrefixAccordEnv(env as any)}/task/operator/chatLog/list`, {
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

export const fetchUsers = async (env: 'tb1' | 'dev' | 'pro', token: string, params: any) => {
  const response = await fetch(`${getApiPrefixAccordEnv(env as any)}/admin/upms/sysUser/list`, {
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

export const doSendMessage = async (env: 'tb1' | 'dev' | 'pro', token: string, params: any) => {
  const response = await fetch(`${getApiPrefixAccordEnv(env as any)}/task/operator/chatLog/add`, {
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

export const uploadFile = async (env: 'tb1' | 'dev' | 'pro', token: string, formData: FormData) => {
  formData.append('bizType ', 'bpm');
  const response = await fetch(`${getRSApiPrefixAccordEnv(env)}/resource/v2/upload/directly`, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token,
    },
    body: formData,
  }).catch((err) => {
    console.error(err);
  });

  if (!response) return [];

  const data = await response.json();

  return data;
};
