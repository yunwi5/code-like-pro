import { Quill } from 'react-quill';
import ImageUploader from 'quill-image-uploader';
import { postExercisePromptImage } from '../../../../apis/image';
import { toastNotify } from '../../../../utils/notification';
import { toBase64Image } from '../../../../utils/string-utils/image';

// Image uploader module
Quill.register('modules/imageUploader', ImageUploader);

export const imageUploader = {
    upload: async (file: any) => {
        try {
            const image: any = await toBase64Image(file);
            const { ok, data } = await postExercisePromptImage({ image });
            console.log('response data:', data);
            if (ok && data) {
                return data.url;
            } else {
                throw new Error('Something went wrong');
            }
        } catch (err) {
            console.log((err as any).message);
            toastNotify(`Oops, ${(err as any).message}`, 'error');
        }
        return '';
    },
};
