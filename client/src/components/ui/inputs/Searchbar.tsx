import React from 'react';
import { BsSearch } from 'react-icons/bs';
import Button from '../buttons/Button';
import CustomSelect from './CustomSelect';

interface Props {
    searchKeys: string[] | readonly string[];
    label?: string | null;
    onKeyChange?: (newKey: string) => void;
    keyValue?: string;
    onTextChange?: (text: string) => void;
    textValue?: string;
    onSearch?: () => void;
    className?: string;
}

const Searchbar: React.FC<Props> = ({
    searchKeys,
    onKeyChange,
    onTextChange,
    keyValue,
    textValue,
    label,
    onSearch,
    className = '',
}) => {
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        onTextChange && onTextChange(e.target.value);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch && onSearch();
    };

    return (
        <form className={`flex items-end gap-1 ${className}`} onSubmit={handleSubmit}>
            <CustomSelect
                options={searchKeys}
                labelText={
                    label ? <span className="font-semibold">{label}</span> : undefined
                }
                id="search-option-select"
                value={keyValue}
                onChange={onKeyChange}
                className="gap-1"
            />
            <div className="flex-1 flex self-end h-[2.5rem]">
                <input
                    type="search"
                    placeholder="Search your words"
                    className="input flex-1 w-full"
                    value={textValue}
                    onChange={handleTextChange}
                />
                <Button type="submit" className="px-2 rounded-tr-sm rounded-br-sm">
                    <BsSearch />
                </Button>
            </div>
        </form>
    );
};

export default Searchbar;
