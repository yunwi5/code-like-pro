import { AvatarImageById, AvatarImageIdList } from '@/assets/avatars';

export function isAvatarImage(picture: string) {
  return AvatarImageIdList.includes(picture);
}

export function getUserPictureUrl(picture: string | undefined) {
  if (picture == null) return undefined;
  if (isAvatarImage(picture)) return AvatarImageById[picture].src;
  return picture;
}

export const toBase64Image = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
