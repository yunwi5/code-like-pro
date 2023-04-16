import { Quill } from 'react-quill';
import ImageUploader from 'quill-image-uploader';
import { postExercisePromptImage } from '../../../../apis/image.api';
import { customToastNotify, toastNotify } from '../../../../utils/notification';
import { toBase64Image } from '../../../../utils/image';
import { toast } from 'react-toastify';

// Image uploader module
Quill.register('modules/imageUploader', ImageUploader);

export const imageUploader = {
    upload: async (file: any) => {
        try {
            // Loading notification for uploading an image that takse time.
            const loadingId = 'loading-image';
            customToastNotify({
                message: 'Uploading image...',
                toastId: loadingId,
                type: 'info',
                autoClose: 10000,
            });

            const image: any = await toBase64Image(file);
            const { ok, data } = await postExercisePromptImage({ image });
            // We cancel the loading toast when it is done.
            toast.dismiss(loadingId);
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
