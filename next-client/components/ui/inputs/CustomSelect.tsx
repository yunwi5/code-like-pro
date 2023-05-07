import React from 'react';

interface Props<T> {
  id: string;
  labelText?: string | JSX.Element;
  // option values
  options: T[];
  // option labels that represent human readable format of the options (optional)
  optionLabels?: string[] | JSX.Element[];
  onChange?: (value: T) => void;
  value?: number | string | string[] | undefined;
  className?: string;
  selectClassName?: string;
}

// App select with custom styles.
// Reusable select input for consistent styling for the select.
const CustomSelect = <T,>(props: Props<T>): React.ReactElement => {
  const {
    value,
    labelText,
    options,
    onChange,
    id,
    optionLabels = [],
    className = '',
    selectClassName = '',
  } = props;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange && onChange(e.target.value as unknown as T);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <select id={id} value={value} onChange={handleChange} className={`input ${selectClassName}`}>
        {options.map((option, idx) => (
          <option key={idx} value={option as unknown as string}>
            {optionLabels[idx] ?? (option as unknown as string)}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
