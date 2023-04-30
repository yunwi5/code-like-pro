import * as monaco from 'monaco-editor';

import Active4d from '../../../../assets/themes/Active4d.json';
import AllHallowsEve from '../../../../assets/themes/AllHallowsEve.json';
import Amy from '../../../../assets/themes/Amy.json';
import BirdsOfParadise from '../../../../assets/themes/BirdsOfParadise.json';
import Blackboard from '../../../../assets/themes/Blackboard.json';
import BrillianceBlack from '../../../../assets/themes/BrillianceBlack.json';
import BrillianceDull from '../../../../assets/themes/BrillianceDull.json';
import ChromeDevtools from '../../../../assets/themes/ChromeDevtools.json';
import Clouds from '../../../../assets/themes/Clouds.json';
import CloudsMidnight from '../../../../assets/themes/CloudsMidnight.json';
import Cobalt from '../../../../assets/themes/Cobalt.json';
import Cobalt2 from '../../../../assets/themes/Cobalt2.json';
import Dawn from '../../../../assets/themes/Dawn.json';
import DominionDay from '../../../../assets/themes/DominionDay.json';
import Dracula from '../../../../assets/themes/Dracula.json';
import Dreamweaver from '../../../../assets/themes/Dreamweaver.json';
import Eiffel from '../../../../assets/themes/Eiffel.json';
import EspressoLibre from '../../../../assets/themes/EspressoLibre.json';
import Github from '../../../../assets/themes/Github.json';
import GithubDark from '../../../../assets/themes/GithubDark.json';
import GithubLight from '../../../../assets/themes/GithubLight.json';
import Idle from '../../../../assets/themes/Idle.json';
import Idlefingers from '../../../../assets/themes/Idlefingers.json';
import Iplastic from '../../../../assets/themes/Iplastic.json';
import Katzenmilch from '../../../../assets/themes/Katzenmilch.json';
import Krtheme from '../../../../assets/themes/Krtheme.json';
import KuroirTheme from '../../../../assets/themes/KuroirTheme.json';
import Lazy from '../../../../assets/themes/Lazy.json';
import MagicwbAmiga from '../../../../assets/themes/MagicwbAmiga.json';
import Merbivore from '../../../../assets/themes/Merbivore.json';
import MerbivoreSoft from '../../../../assets/themes/MerbivoreSoft.json';
import Monoindustrial from '../../../../assets/themes/Monoindustrial.json';
import Monokai from '../../../../assets/themes/Monokai.json';
import MonokaiBright from '../../../../assets/themes/MonokaiBright.json';
import NightOwl from '../../../../assets/themes/NightOwl.json';
import Nord from '../../../../assets/themes/Nord.json';
import OceanicNext from '../../../../assets/themes/OceanicNext.json';
import PastelsOnDark from '../../../../assets/themes/PastelsOnDark.json';
import SlushAndPoppies from '../../../../assets/themes/SlushAndPoppies.json';
import SolarizedDark from '../../../../assets/themes/SolarizedDark.json';
import SolarizedLight from '../../../../assets/themes/SolarizedLight.json';
import Spacecadet from '../../../../assets/themes/Spacecadet.json';
import Sunburst from '../../../../assets/themes/Sunburst.json';
import TextmateMacClassic from '../../../../assets/themes/TextmateMacClassic.json';
import Tomorrow from '../../../../assets/themes/Tomorrow.json';
import TomorrowNight from '../../../../assets/themes/TomorrowNight.json';
import TomorrowNightBlue from '../../../../assets/themes/TomorrowNightBlue.json';
import TomorrowNightBright from '../../../../assets/themes/TomorrowNightBright.json';
import TomorrowNightEighties from '../../../../assets/themes/TomorrowNightEighties.json';
import Twilight from '../../../../assets/themes/Twilight.json';
import UpstreamSunburst from '../../../../assets/themes/UpstreamSunburst.json';
import VibrantInk from '../../../../assets/themes/VibrantInk.json';
import XcodeDefault from '../../../../assets/themes/XcodeDefault.json';
import Zenburnesque from '../../../../assets/themes/Zenburnesque.json';

export type Monaco = typeof monaco;

export function loadCustomMonacoThemes(monaco: Monaco): Monaco {
  Object.entries(customThemes).forEach(([themeName, theme]) => {
    try {
      monaco.editor.defineTheme(themeName, theme as monaco.editor.IStandaloneThemeData);
    } catch (err) {
      console.log(`Error loading theme ${themeName}. Error: ${(err as Error).message}`);
    }
  });

  return monaco;
}

const customThemes: Record<string, any> = {
  Monoindustrial,
  Idlefingers,
  SolarizedLight,
  Zenburnesque,
  TomorrowNightBright,
  Dawn,
  VibrantInk,
  Iplastic,
  KuroirTheme,
  OceanicNext,
  MerbivoreSoft,
  NightOwl,
  Dreamweaver,
  GithubDark,
  Spacecadet,
  AllHallowsEve,
  Cobalt2,
  Active4d,
  ChromeDevtools,
  Dracula,
  Cobalt,
  CloudsMidnight,
  TomorrowNightBlue,
  Lazy,
  Monokai,
  Nord,
  MagicwbAmiga,
  TextmateMacClassic,
  Blackboard,
  Idle,
  Sunburst,
  TomorrowNightEighties,
  GithubLight,
  Clouds,
  Merbivore,
  Amy,
  XcodeDefault,
  Eiffel,
  SolarizedDark,
  DominionDay,
  BirdsOfParadise,
  Tomorrow,
  TomorrowNight,
  UpstreamSunburst,
  EspressoLibre,
  PastelsOnDark,
  Katzenmilch,
  SlushAndPoppies,
  BrillianceDull,
  Github,
  MonokaiBright,
  BrillianceBlack,
  Twilight,
  Krtheme,
};

export const themesList = ['light', 'vs-dark', ...Object.keys(customThemes)];
