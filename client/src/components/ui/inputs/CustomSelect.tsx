import React from 'react';

interface Props {
    labelText?: string;
    labelId?: string;
    options: string[] | readonly string[];
    className?: string;
    onChange?: (value: string) => void;
    value?: string;
    id: string;
}

// App select with custom styles.
// Reusable select input for consistent styling for the select.
const CustomSelect: React.FC<Props> = (props) => {
    const { value, labelText, labelId, options, onChange, id, className } = props;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange && onChange(e.target.value);
    };

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            {labelText && (
                <label id={labelId ?? ''} className="text-[1.05rem]" htmlFor={id}>
                    {labelText}
                </label>
            )}
            <select
                id={id}
                value={value}
                onChange={handleChange}
                className="px-2 py-2 border-2 border-gray-300 bg-gray-50 rounded-sm shadow-md focus:shadow-lg focus:outline focus:outline-2 focus:outline-main-300"
            >
                {options.map((option, idx) => (
                    <option className="text-base" key={idx} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CustomSelect;
