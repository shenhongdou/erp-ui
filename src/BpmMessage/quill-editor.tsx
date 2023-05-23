import React, { useMemo, useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { message } from 'antd';
import ImageResize from 'quill-image-resize-module';

import { uploadFile } from './apis';

import 'react-quill/dist/quill.snow.css';

Quill.register('modules/imageResize', ImageResize);

let clipboardDataTypes: string[] = [];
console.log(ImageResize, 'ImageResize');
interface IProps {
  token: string;
  env: 'tb1' | 'dev' | 'pro';
  [key: string]: any;
}
// TODO 同时复制图片（本地截图）和文字，图片复制失败
// TODO 同时复制图片和文字，图片缺失
export default (props: IProps) => {
  const { token, env, ...restProps } = props;
  const reactQuillRef = useRef<any>(null);

  const handeUpload = async (files: File[]) => {
    const hide = message.loading('loading...');
    const formData = new FormData();
    files?.forEach((file) => {
      formData.append('file', file);
    });

    const ret = await uploadFile(env, token, formData).catch((err) => {
      console.error(err);
    });

    hide();

    return ret;
  };

  //   上传图片处理方法
  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.setAttribute('multiple', 'multiple');
    input.click();
    input.onchange = async () => {
      const files = input?.files;

      if (!files?.length) return;

      const ret = await handeUpload(Array.from(files));

      if (!ret?.body?.length) return;

      const quill = reactQuillRef?.current?.getEditor(); //获取到编辑器本身
      ret?.body.forEach((item: any) => {
        const cursorPosition = quill.getSelection()?.index; //获取当前光标位置

        quill.insertEmbed(cursorPosition, 'image', item.url); //插入图片
        quill.setSelection(cursorPosition + 1); //光标位置加1
      });
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ['bold', 'italic', 'underline', 'strike'], //加粗/倾斜/下划线/删除线
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ header: 1 }, { header: 2 }],
          ['blockquote', 'code-block'], //" </>
          [{ list: 'ordered' }, { list: 'bullet' }], //编号排序/点排序
          ['link', 'image'], // 链接/图片
          [{ color: [] }, { background: [] }], //字体颜色/背景颜色
        ],
        handlers: {
          image: imageHandler,
        },
        ImageResize: {},
      },
    }),
    [],
  );

  useEffect(() => {
    const editor = reactQuillRef?.current?.getEditor();

    editor?.root?.addEventListener('paste', (e: any) => {
      clipboardDataTypes = [];

      const clipboardData = e.clipboardData;

      clipboardDataTypes = clipboardData?.types?.length ? [...clipboardData.types] : [];

      const files = Array.from(clipboardData?.files as FileList)?.filter((item) =>
        item.type.startsWith('image'),
      );

      if (!files?.length) return;

      handeUpload(files).then((res) => {
        res?.body?.forEach((item: any) => {
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, 'image', item?.url);
          editor.setSelection(range?.index + 1); //光标位置加1
        });
      });
    });

    editor.clipboard.addMatcher('IMG', (node: any, delta: any) => {
      if (clipboardDataTypes?.includes('text/html') && !clipboardDataTypes?.includes('Files')) {
        clipboardDataTypes = [];
        return delta;
      }

      const Delta = Quill.import('delta'); // 忽略base64插入操作

      clipboardDataTypes = [];
      return new Delta().insert('');
    });
  }, []);

  return <ReactQuill theme="snow" ref={reactQuillRef} modules={modules} {...restProps} />;
};
