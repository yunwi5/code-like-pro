// detecting app avatar image works for now
export function isAvatarImage(picture: string) {
  return picture.includes('/assets/avatar');
}

export const toBase64Image = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
