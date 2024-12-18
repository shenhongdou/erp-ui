import { message } from 'antd';
import { downloadFile, downloadByTagA, getApiPrefixAccordEnv } from '../util';

const encryptTestPrefix = 'https://weee-test-documents';
const encryptPrdPrefix = 'https://weee-prd-document';

export default (token: string, env: 'tb1' | 'dev' | 'pro') => {
  const isEncryptedFile = (url: string) => {
    if (!url) return false;

    return url.startsWith(encryptTestPrefix) || url.startsWith(encryptPrdPrefix);
  };

  const getDecodeFileUrl = async (sourceUrl: string) => {
    if (!isEncryptedFile(sourceUrl)) return sourceUrl;

    const hide = message.loading(`文件解析中...`, 0);

    const ret = await fetch(
      `${getApiPrefixAccordEnv(env as any)}/admin/file/download?url=${sourceUrl}`,
      {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      },
    );

    if (ret?.status !== 200) {
      hide();
      message.error('文件解析异常');
      return;
    }

    const blob = await ret?.blob();
    const url = window.URL.createObjectURL(blob);

    hide();

    return url;
  };

  const revokeURL = (url: string) => {
    window.URL.revokeObjectURL(url);
  };

  const download = async (sourceUrl: string, filename: string) => {
    const isEncrypted = isEncryptedFile(sourceUrl);

    if (isEncrypted) {
      const url = await getDecodeFileUrl(sourceUrl);

      if (!url) return;

      downloadByTagA(url, filename);
      revokeURL(url);
    } else {
      downloadFile(sourceUrl, filename);
    }
  };

  return {
    isEncryptedFile,
    getDecodeFileUrl,
    download,
    revokeURL,
  };
};
