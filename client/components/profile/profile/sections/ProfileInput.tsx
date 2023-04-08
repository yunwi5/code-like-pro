import React from 'react';

interface Props {
  label: string;
  value: string;
  onChange(value: string): void;
  className?: string;
  type?: 'input' | 'textarea';
}

const ProfileInput: React.FC<Props> = (props) => {
  const { label, value, onChange, type = 'input', className = '' } = props;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    onChange(e.target.value);

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <h5 className="text-lg">{label}</h5>
      {type === 'input' ? (
        <input
          value={value}
          onChange={handleChange}
          className="!py-[0.4rem] rounded-md input max-w-[12rem]"
        />
      ) : (
        <textarea
          value={value}
          onChange={handleChange}
          className="!py-[0.4rem] rounded-md input max-w-[max(24rem,50%)]"
        />
      )}
    </div>
  );
};

export default ProfileInput;
