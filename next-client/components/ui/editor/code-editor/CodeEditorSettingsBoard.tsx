import React, { useTransition } from 'react';
import ClickAwayListener from 'react-click-away-listener';
import { BsFillShiftFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { ICreateUserEditorSettings } from '@/models/interfaces';
import { editorSettingsActions } from '@/store/redux/editor-settings-slice';
import { selectEditorSettings } from '@/store/redux/selectors/editor-settings.selectors';
import { useAppDispatch } from '@/store/redux/store';
import { updateUserEditorSettings } from '@/store/redux/thunks/editor-settings-thunks';

import CustomSelect from '../../inputs/CustomSelect';
import CustomSwitch from '../../inputs/CustomSwitch';

import {
  EditorType,
  FontSize,
  FontSizeList,
  TabSize,
  TabSizeList,
  themes,
} from './code-editor.util';

type Props = {
  onClose: () => void;
  open: boolean;
};

const styles = {
  section: 'border-b-2 border-gray-200 pb-3 mb-2',
  sectionHeading: 'text-gray-600 font-semibold text-lg mb-2',
  sectionRow: 'flex justify-between items-center gap-3 mb-2',
  keyBindingWrapper: 'flex items-center gap-x-1 text-sm',
};

const CodeEditorSettingsBoard: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const { editorType, theme, fontSize, tabSize } = useSelector(selectEditorSettings);
  const [_, startTransition] = useTransition();

  const setTheme = (newTheme: string) => {
    dispatch(editorSettingsActions.setTheme(newTheme));
    saveEditorSettings({ theme: newTheme });
  };

  const setTabSize = (newTabSize: TabSize) => {
    dispatch(editorSettingsActions.setTabSize(newTabSize));
    saveEditorSettings({ tabSize: newTabSize });
  };

  const setFontSize = (newFontSize: FontSize) => {
    dispatch(editorSettingsActions.setFontSize(newFontSize));
    saveEditorSettings({ fontSize: newFontSize });
  };

  const setEditorType = (newEditorType: EditorType) => {
    dispatch(editorSettingsActions.setEditorType(newEditorType));
    saveEditorSettings({ editorType: newEditorType });
  };
  const handleVimToggle = () => {
    const newEditorType = editorType === EditorType.VIM ? EditorType.DEFAULT : EditorType.VIM;
    setEditorType(newEditorType);
  };

  const handleEmacsToggle = () => {
    const newEditorType = editorType === EditorType.EMACS ? EditorType.DEFAULT : EditorType.EMACS;
    setEditorType(newEditorType);
  };

  const saveEditorSettings = async (updatedProperties: Partial<ICreateUserEditorSettings>) => {
    startTransition(() => {
      const editorSettings: ICreateUserEditorSettings = {
        editorType,
        theme,
        fontSize,
        tabSize,
        ...updatedProperties,
      };
      dispatch(updateUserEditorSettings(editorSettings));
    });
  };

  return (
    <ClickAwayListener onClickAway={onClose}>
      <div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, translateX: 135 }}
              animate={{ opacity: 1, translateX: 0 }}
              exit={{ opacity: 0, translateX: 135 }}
              transition={{ duration: 0.35 }}
              style={{
                boxShadow:
                  'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px',
              }}
              className="absolute top-[5.6rem] right-[3px] z-[100] flex flex-col gap-4 px-4 py-3 bg-white text-gray-500 border rounded-md"
            >
              <h2 className="text-xl text-gray-600 font-semibold">Editor Preferences</h2>

              <section className={`${styles.section}`}>
                <h3 className={`${styles.sectionHeading}`}>Styling</h3>
                <CustomSelect
                  id="theme-select"
                  className="!gap-1 mb-2"
                  labelText="Theme"
                  options={themes}
                  value={theme}
                  onChange={(newTheme) => setTheme(newTheme)}
                />
                <div className="flex gap-3">
                  <CustomSelect
                    id="tab-size-select"
                    className="flex-1 !gap-1"
                    labelText="Tab Size"
                    options={TabSizeList}
                    value={tabSize}
                    onChange={(newTabSize) => setTabSize(newTabSize)}
                  />
                  <CustomSelect
                    id="font-size-select"
                    className="flex-1 !gap-1"
                    labelText="Font Size"
                    options={FontSizeList}
                    value={fontSize}
                    onChange={(newFontSize) => setFontSize(newFontSize)}
                  />
                </div>
              </section>

              <section className={`${styles.section}`}>
                <h3 className={`${styles.sectionHeading}`}>Editor Type</h3>
                <div className={`${styles.sectionRow}`}>
                  <p className="mr-3">Vim</p>
                  <CustomSwitch
                    id="vim-switch"
                    onToggle={handleVimToggle}
                    isOn={editorType === EditorType.VIM}
                  />
                </div>
                <div className={`${styles.sectionRow}`}>
                  <p className="mr-3">Emacs</p>
                  <CustomSwitch
                    id="emacs-switch"
                    onToggle={handleEmacsToggle}
                    isOn={editorType === EditorType.EMACS}
                  />
                </div>
              </section>

              <section className={`${styles.section}`}>
                <h3 className={`${styles.sectionHeading}`}>Keyboard Shortcuts</h3>
                <div className={`${styles.sectionRow}`}>
                  <p>Run code:</p>
                  <mark className={styles.keyBindingWrapper}>
                    {getRunCodeShortCutForPlatform()}
                  </mark>
                </div>
                <div className={`${styles.sectionRow}`}>
                  <p>Submit code:</p>
                  <mark className={styles.keyBindingWrapper}>
                    {getSubmitCodeShortCutForPlatform()}
                  </mark>
                </div>
              </section>

              <button
                onClick={onClose}
                className="w-full -mt-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </ClickAwayListener>
  );
};

function getRunCodeShortCutForPlatform() {
  // ctrl + backtick
  return 'ctrl + `';
}

function getSubmitCodeShortCutForPlatform() {
  // ctrl + shift + backtick
  return (
    <>
      ctrl {' + '} <BsFillShiftFill /> {' + `'}
    </>
  );
}

export default CodeEditorSettingsBoard;
