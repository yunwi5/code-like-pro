import React from 'react';

interface Props {
    id: string;
    labelText?: string | JSX.Element;
    // option values
    options: number[] | string[] | readonly string[];
    // option labels that represent human readable format of the options (optional)
    optionLabels?: string[] | JSX.Element[];
    className?: string;
    onChange?: (value: string) => void;
    value?: string;
}

// App select with custom styles.
// Reusable select input for consistent styling for the select.
const CustomSelect: React.FC<Props> = (props) => {
    const {
        value,
        labelText,
        options,
        onChange,
        id,
        optionLabels = [],
        className = '',
    } = props;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e.target.value);
    };

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {labelText && <label htmlFor={id}>{labelText}</label>}
            <select
                id={id}
                value={value}
                onChange={handleChange}
                className="px-2 py-2 border-2 border-gray-300 bg-gray-50 rounded-sm shadow-md focus:bg-white focus:shadow-lg focus:outline focus:outline-2 focus:outline-main-300"
            >
                {options.map((option, idx) => (
                    <option key={idx} value={option}>
                        {optionLabels[idx] ?? option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomSelect;
