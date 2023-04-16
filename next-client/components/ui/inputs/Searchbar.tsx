import React, { useState, useTransition } from 'react';
import { BsSearch } from 'react-icons/bs';
import { MdClose } from 'react-icons/md';

import Button from '../buttons/Button';

import CustomSelect from './CustomSelect';

import styles from './Searchbar.module.scss';

interface Props {
  searchKeys: string[] | readonly string[];
  onSearch: (searchKey: string, text: string) => void;
  defaultSearchKey?: string;
  label?: string | null;
  className?: string;
}

const Searchbar: React.FC<Props> = ({
  defaultSearchKey,
  searchKeys,
  label,
  onSearch = () => {},
  className = '',
}) => {
  const [searchKey, setSearchKey] = useState(defaultSearchKey ?? searchKeys[0]);
  const [text, setText] = useState('');
  const [_, startTransition] = useTransition();

  const handleKeyChange = (newKey: string) => {
    setSearchKey(newKey);
    startTransition(() => {
      onSearch(newKey, text);
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    setText(newText);
    startTransition(() => {
      onSearch(searchKey, newText);
    });
  };

  const clearInput = () => {
    setText('');
    startTransition(() => {
      onSearch(searchKey, '');
    });
  };

  // This is for to refresh
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchKey, text);
  };

  return (
    <form className={`flex items-end gap-1 ${className}`} onSubmit={handleSubmit}>
      {label ? (
        <label htmlFor="search-option-select" className="font-semibold col-span-2">
          {label}
        </label>
      ) : undefined}
      <div className="flex items-center gap-1 w-full">
        <CustomSelect
          options={searchKeys}
          id="search-option-select"
          value={searchKey}
          onChange={handleKeyChange}
          className="h-[2.55rem]"
          selectClassName="flex-1"
        />
        <div className={`${styles.search} flex-1 flex self-end h-[2.55rem]`}>
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search your words"
              className="input w-full h-full"
              value={text}
              onChange={handleInputChange}
            />
            <div
              onClick={() => clearInput()}
              className={`${styles.clear} absolute top-[50%] right-2 -translate-y-[54%] flex-center w-[2.1rem] h-[2.1rem] hover:bg-gray-200 hover:shadow-md transition-all rounded-full cursor-pointer`}
            >
              <MdClose className="text-gray-600/90 text-2xl" />
            </div>
          </div>
          <Button type="submit" className="px-2 rounded-tr-sm rounded-br-sm">
            <BsSearch />
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Searchbar;
