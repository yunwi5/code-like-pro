import { toastNotify } from './notification.util';

export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    const message = err instanceof Error ? err.message : '';
    toastNotify(`Failed to copy text to clipboard.. ${message}`, 'error');
  }
}
