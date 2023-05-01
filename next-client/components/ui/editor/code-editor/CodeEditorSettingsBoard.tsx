import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import { editorSettingsActions } from '@/store/redux/editor-settings-slice';
import { selectEditorType } from '@/store/redux/selectors/editor-settings.selectors';

import CustomSelect from '../../inputs/CustomSelect';
import CustomSwitch from '../../inputs/CustomSwitch';

import { themes } from './code-editor.util';

type Props = {
  onClose: () => void;
  open: boolean;
};

const styles = {
  section: 'border-b-2 border-gray-200 pb-3 mb-2',
  sectionHeading: 'text-gray-600 font-semibold text-lg mb-2',
  sectionRow: 'flex justify-between items-center mb-2',
};

export enum EditorType {
  DEFAULT = 'default',
  VIM = 'vim',
  EMACS = 'emacs',
}

const CodeEditorSettingsBoard: React.FC<Props> = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const editorType = useSelector(selectEditorType);

  const setTheme = (newTheme: string) => {
    dispatch(editorSettingsActions.setTheme(newTheme));
  };

  const setEditorType = (newEditorType: string) => {
    dispatch(editorSettingsActions.setEditorType(newEditorType));
  };
  const handleVimToggle = () => {
    const newEditorType = editorType === EditorType.VIM ? EditorType.DEFAULT : EditorType.VIM;
    setEditorType(newEditorType);
  };

  const handleEmacsToggle = () => {
    const newEditorType = editorType === EditorType.EMACS ? EditorType.DEFAULT : EditorType.EMACS;
    setEditorType(newEditorType);
  };

  return (
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
              className="!gap-1"
              labelText="Theme"
              options={themes}
              onChange={(newTheme) => setTheme(newTheme)}
            />
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
              <mark className="text-sm"> CMD + `</mark>
            </div>
            <div className={`${styles.sectionRow}`}>
              <p>Submit code:</p>
              <mark className="ml-2 text-sm">CMD + Shift + `</mark>
            </div>
          </section>

          <button
            onClick={onClose}
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CodeEditorSettingsBoard;
