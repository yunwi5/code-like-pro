export type OS = 'Windows' | 'Mac OS' | 'Linux' | 'Android' | 'iOS' | 'Unknown OS';

export function getOS(): OS {
  const userAgent = window.navigator.userAgent;
  if (/Mac/i.test(userAgent)) {
    return 'Mac OS';
  } else if (/Windows/i.test(userAgent)) {
    return 'Windows';
  } else if (/Linux/i.test(userAgent)) {
    return 'Linux';
  } else if (/Android/i.test(userAgent)) {
    return 'Android';
  } else {
    return 'Unknown OS';
  }
}

export function shouldUseCmdKey(): boolean {
  return getOS() === 'Mac OS';
}

export function getBrowser(): string {
  const userAgent = navigator.userAgent;
  const browsers: Record<string, RegExp> = {
    chrome: /chrome/i,
    safari: /safari/i,
    firefox: /firefox/i,
    ie: /internet explorer/i,
    opera: /opera/i,
  };
  for (const key in browsers) {
    if (browsers[key].test(userAgent)) {
      return key;
    }
  }

  return 'unknown';
}
