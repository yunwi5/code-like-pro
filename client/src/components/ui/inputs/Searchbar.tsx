import React from 'react';
import { BsSearch } from 'react-icons/bs';
import Button from '../buttons/Button';
import CustomSelect from './CustomSelect';

interface Props {
    searchKeys: string[] | readonly string[];
    onKeyChange?: (newKey: string) => void;
    keyValue?: string;
    onTextChange?: (text: string) => void;
    textValue?: string;
    onSearch?: () => void;
}

const Searchbar: React.FC<Props> = ({
    searchKeys,
    onKeyChange,
    onTextChange,
    keyValue,
    textValue,
    onSearch,
}) => {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        onTextChange && onTextChange(e.target.value);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch && onSearch();
    };

    return (
        <form className="flex items-end gap-1" onSubmit={handleSubmit}>
            <CustomSelect
                options={searchKeys}
                labelText={<span className="font-semibold">Search</span>}
                id="search-option-select"
                className="gap-1"
                value={keyValue}
                onChange={onKeyChange}
            />
            <div className="flex-1 flex self-end h-[2.5rem]">
                <input
                    type="search"
                    placeholder="Search your words"
                    className="input flex-1 w-full"
                    value={textValue}
                    onChange={handleTextChange}
                />
                {/* <button className="px-2 text-xl bg-gray-600/90 text-gray-50 hover:bg-main-700">
                    <BsSearch />
                </button> */}
                <Button type="submit" className="px-2 rounded-tr-sm rounded-br-sm">
                    <BsSearch />
                </Button>
            </div>
        </form>
    );
};

export default Searchbar;
