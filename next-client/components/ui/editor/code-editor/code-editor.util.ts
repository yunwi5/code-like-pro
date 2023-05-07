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

export type TabSize = 2 | 4;

export const TabSizeList: TabSize[] = [2, 4];

export type FontSize = 12 | 14 | 16 | 18 | 20;

export const FontSizeList: FontSize[] = [12, 14, 16, 18, 20];

export enum EditorType {
  DEFAULT = 'default',
  VIM = 'vim',
  EMACS = 'emacs',
}

export function loadMonacoVim(
  editor: monaco.editor.IStandaloneCodeEditor,
): Promise<{ vimMode: any; vimModeSettings: any }> {
  return new Promise((resolve) => {
    (window as any).require.config({
      paths: {
        'monaco-vim': 'https://unpkg.com/monaco-vim/dist/monaco-vim',
      },
    });

    (window as any).require(['monaco-vim'], function (MonacoVim: any) {
      const statusNode = document.getElementById('vim-statusbar');
      const vimMode = MonacoVim.initVimMode(editor, statusNode);
      resolve({ vimMode, vimModeSettings: MonacoVim.VimMode });
    });
  });
}

export function loadMonacoEmacs(
  editor: monaco.editor.IStandaloneCodeEditor,
): Promise<{ emacsMode: any; emacsModeSettings: any }> {
  return new Promise((resolve) => {
    (window as any).require.config({
      paths: {
        'monaco-emacs': 'https://unpkg.com/monaco-emacs/dist/monaco-emacs',
      },
    });
    (window as any).require(['monaco-emacs'], function (MonacoEmacs: any) {
      const statusNode = document.getElementById('emacs-statusbar');
      const emacsMode = new MonacoEmacs.EmacsExtension(editor);
      emacsMode.onDidMarkChange(function (ev: string) {
        if (statusNode) statusNode.textContent = ev ? 'Mark Set!' : 'Mark Unset';
      });
      emacsMode.onDidChangeKey(function (str: string) {
        if (statusNode) statusNode.textContent = str;
      });
      emacsMode.start();

      resolve({ emacsMode, emacsModeSettings: MonacoEmacs.EmacsMode });
    });
  });
}
