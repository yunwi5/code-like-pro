import React from 'react';

interface Props {
    labelText?: string;
    value?: string;
    onChange?: (value: string) => void;
    rows?: 3;
    error?: string | null;
}

const CustomTextArea: React.FC<Props> = ({
    labelText,
    value,
    onChange,
    rows = 3,
    error = '',
}) => {
    return (
        <div className="flex flex-col gap-2">
            {labelText && <label>Description</label>}
            <textarea
                rows={rows}
                value={value}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    onChange && onChange(e.target.value)
                }
                className={`px-2 py-1 rounded-sm shadow-md focus:shadow-lg border-2 border-gray-300 focus:outline focus:outline-2 focus:outline-main-300 ${
                    error ? 'border-rose-400 focus:outline-transparent' : ''
                }`}
            />
            {error && <p className="text-rose-500">{error}</p>}
        </div>
    );
};

export default CustomTextArea;
