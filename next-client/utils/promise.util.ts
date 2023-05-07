export async function sleep(durationMs: number) {
  return await new Promise<void>((resolve) => {
    const timer = setTimeout(() => {
      resolve();
      clearTimeout(timer);
    }, durationMs);
  });
}
