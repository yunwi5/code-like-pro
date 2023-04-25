import * as monaco from 'monaco-editor';

// TODO: example themes, should update
import monokai from '../../../../assets/themes/Monokai.json';
import Tomorrow from '../../../../assets/themes/Tomorrow.json';
import TomorrowNight from '../../../../assets/themes/Tomorrow-Night.json';
import TomorrowNightBlue from '../../../../assets/themes/Tomorrow-Night-Blue.json';
import TomorrowNightBright from '../../../../assets/themes/Tomorrow-Night-Bright.json';
import TomorrowNightEighties from '../../../../assets/themes/Tomorrow-Night-Eighties.json';
import Twilight from '../../../../assets/themes/Twilight.json';
import XCodeDefault from '../../../../assets/themes/Xcode_default.json';

export type Monaco = typeof monaco;

export function loadCustomMonacoThemes(monaco: Monaco): Monaco {
  monaco.editor.defineTheme('monokai', monokai as monaco.editor.IStandaloneThemeData);
  monaco.editor.defineTheme('Tomorrow', Tomorrow as monaco.editor.IStandaloneThemeData);
  monaco.editor.defineTheme('TomorrowNight', TomorrowNight as monaco.editor.IStandaloneThemeData);
  monaco.editor.defineTheme(
    'TomorrowNightBlue',
    TomorrowNightBlue as monaco.editor.IStandaloneThemeData,
  );
  monaco.editor.defineTheme(
    'TomorrowNightBright',
    TomorrowNightBright as monaco.editor.IStandaloneThemeData,
  );
  monaco.editor.defineTheme(
    'TomorrowNightEighties',
    TomorrowNightEighties as monaco.editor.IStandaloneThemeData,
  );
  monaco.editor.defineTheme('Twilight', Twilight as monaco.editor.IStandaloneThemeData);
  monaco.editor.defineTheme('XCodeDefault', XCodeDefault as monaco.editor.IStandaloneThemeData);

  return monaco;
}
