import { AvatarImagesList } from '../assets';

export function isAvatarImage(picture: string) {
    return AvatarImagesList.includes(picture);
}

export const toBase64Image = (file: File) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
