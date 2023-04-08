export async function sleep(duration: number) {
  return await new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      resolve();
      clearTimeout(timer);
    }, duration);
  });
}
