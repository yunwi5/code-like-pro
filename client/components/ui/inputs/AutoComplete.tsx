import React, { useEffect, useRef, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import ClickAwayListener from 'react-click-away-listener';
import { filterListByString } from '../../../utils/filter-utils/string.filter';

interface Props {
  options: string[] | readonly string[];
  onAdd: (text: string) => void;
  label?: string;
  id?: string;
  className?: string;
  placeholder?: string;
  error?: string | null;
}

const ENTER_KEY = 'Enter';
const UP_KEY = 'ArrowUp';
const DOWN_KEY = 'ArrowDown';

// Input for autocomplete functionality.
// For example, the ChallengeTags component is using this AutoComplete to add tags dynamically.
// It allows users to add their own inputs, as well as predefined inputs passed as "options" prop.
const AutoComplete: React.FC<Props> = (props) => {
  const { label, options, onAdd, id, className, placeholder, error } = props;
  const [showDropdown, setShowDropdown] = useState(false);
  const [text, setText] = useState('');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Filtering auto complete options by user keyboard input.
  const [filteredOptions, setFilteredOptions] = useState(options);

  // Ref that tracks the lastly typed user keyboard input.
  const userInputRef = useRef<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    userInputRef.current = newText;
    setShowDropdown(true);
    const filtered = filterListByString(options as string[], newText);
    setFilteredOptions(filtered);
  };

  const handleKeyboard = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === DOWN_KEY) {
      setActiveIndex((ps) => {
        if (ps === filteredOptions.length - 1) return ps;
        const newIndex = Math.min((ps ?? -1) + 1, filteredOptions.length - 1);
        setText(filteredOptions[newIndex]);
        return newIndex;
      });
    }

    if (e.key === UP_KEY) {
      setActiveIndex((ps) => {
        if (ps == null || ps <= 0) {
          setText(userInputRef.current);
          return null;
        }
        const newIndex = Math.max((ps || 0) - 1, 0);
        setText(filteredOptions[newIndex]);
        return newIndex;
      });
    }

    if (e.key === ENTER_KEY) {
      onAdd(text);
      setShowDropdown(false);
      setText('');
      setFilteredOptions(options);
      setActiveIndex(null);
    }
  };

  // If the user clicks the dropdown option, add it and close the dropdown.
  const handleClickOption = (option: string) => {
    onAdd(option);
    setText('');
    setShowDropdown(false);
  };

  // If the option changes, update the filtered options as well.
  useEffect(() => {
    setFilteredOptions(options);
  }, [options]);

  return (
    <ClickAwayListener onClickAway={() => setShowDropdown(false)}>
      <div className={`relative ${className ?? ''}`}>
        <div className="relative flex flex-col gap-2">
          {label && <label htmlFor={id}>{label}</label>}
          <input
            id={id}
            placeholder={placeholder}
            value={text}
            onClick={() => setShowDropdown(true)}
            onChange={handleInputChange}
            onKeyDown={handleKeyboard}
            className="px-2 py-[0.35rem] border-2 border-gray-300  rounded-sm shadow-md focus-main"
          />
          <AiFillCaretDown
            onClick={() => setShowDropdown((ps) => !ps)}
            className="absolute hover:text-blue-500 top-[62%] right-3 cursor-pointer"
          />
        </div>
        {showDropdown && (
          <ul className="absolute z-[100] top-[103%] left-0 w-full shadow-lg bg-gray-100">
            {filteredOptions.map((option, idx) => (
              <li
                key={idx}
                className={`px-3 py-1 hover:bg-gray-300 hover:text-blue-500 cursor-pointer ${
                  activeIndex === idx ? 'bg-gray-300 text-blue-500' : ''
                }`}
                onClick={() => handleClickOption(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
        {error && <p className="mt-2 -mb-2 text-rose-500">{error}</p>}
      </div>
    </ClickAwayListener>
  );
};

export default AutoComplete;
