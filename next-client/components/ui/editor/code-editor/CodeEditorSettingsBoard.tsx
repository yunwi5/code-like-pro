import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type Props = {
  onClose: () => void;
  open: boolean;
};

const styles = {
  sectionHeading: '',
};

const CodeEditorSettingsBoard: React.FC<Props> = ({ open, onClose }) => {
  const [theme, setTheme] = useState('default');
  const [vimEnabled, setVimEnabled] = useState(false);
  const [emacsEnabled, setEmacsEnabled] = useState(false);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
  };

  const handleVimToggle = () => {
    setVimEnabled(!vimEnabled);
  };

  const handleEmacsToggle = () => {
    setEmacsEnabled(!emacsEnabled);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, translateX: 135 }}
          animate={{ opacity: 1, translateX: 0 }}
          exit={{ opacity: 0, translateX: 135 }}
          transition={{ duration: 0.35 }}
          className="absolute top-[5.6rem] right-[3px] z-[100] flex flex-col gap-4 px-4 py-3 bg-white border rounded-md shadow-xl"
        >
          <h3 className="text-xl font-semibold">Editor Preferences</h3>

          <div className="mb-4">
            <h4 className={`${styles.sectionHeading}`}>Theme</h4>
            <select
              id="theme-select"
              value={theme}
              onChange={handleThemeChange}
              className="block w-full bg-white border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="default">Default</option>
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Keyboard Bindings</label>
            <div>
              <label htmlFor="vim-toggle" className="flex items-center cursor-pointer">
                <div className="mr-3">Vim</div>
                <input
                  id="vim-toggle"
                  type="checkbox"
                  checked={vimEnabled}
                  onChange={handleVimToggle}
                  className="form-checkbox rounded-full"
                />
              </label>
            </div>
            <div>
              <label htmlFor="emacs-toggle" className="flex items-center cursor-pointer">
                <div className="mr-3">Emacs</div>
                <input
                  id="emacs-toggle"
                  type="checkbox"
                  checked={emacsEnabled}
                  onChange={handleEmacsToggle}
                  className="form-checkbox rounded-full"
                />
              </label>
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Keyboard Shortcuts</label>
            <div>Run code: CMD + `</div>
            <div>Submit code: CMD + Shift + `</div>
          </div>

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
