import * as monaco from 'monaco-editor';

export type Monaco = typeof monaco;

export async function loadCustomMonacoThemes(monaco: Monaco): Promise<Monaco> {
  for (const themeName of customThemes) {
    try {
      const response = await fetch(`/themes/${themeName}.json`);
      const theme = await response.json();
      monaco.editor.defineTheme(themeName, theme as monaco.editor.IStandaloneThemeData);
    } catch (err) {
      console.log(`Error loading theme ${themeName}. Error: ${(err as Error).message}`);
    }
  }

  return monaco;
}

const customThemes = [
  'Active4d',
  'AllHallowsEve',
  'Amy',
  'BirdsOfParadise',
  'Blackboard',
  'BrillianceBlack',
  'BrillianceDull',
  'ChromeDevtools',
  'Clouds',
  'CloudsMidnight',
  'Cobalt',
  'Cobalt2',
  'Dawn',
  'DominionDay',
  'Dracula',
  'Dreamweaver',
  'Eiffel',
  'EspressoLibre',
  'Github',
  'GithubDark',
  'GithubLight',
  'Idle',
  'Idlefingers',
  'Iplastic',
  'Katzenmilch',
  'Krtheme',
  'KuroirTheme',
  'Lazy',
  'MagicwbAmiga',
  'Merbivore',
  'MerbivoreSoft',
  'Monoindustrial',
  'Monokai',
  'MonokaiBright',
  'NightOwl',
  'Nord',
  'OceanicNext',
  'PastelsOnDark',
  'SlushAndPoppies',
  'SolarizedDark',
  'SolarizedLight',
  'Spacecadet',
  'Sunburst',
  'TextmateMacClassic',
  'Tomorrow',
  'TomorrowNight',
  'TomorrowNightBlue',
  'TomorrowNightBright',
  'TomorrowNightEighties',
  'Twilight',
  'UpstreamSunburst',
  'VibrantInk',
  'XcodeDefault',
  'Zenburnesque',
];

export const themes = ['light', 'vs-dark', ...customThemes];
