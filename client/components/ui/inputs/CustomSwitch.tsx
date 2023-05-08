import React, { FC, useId } from 'react';

import styles from './CustomSwitch.module.scss';

type CustomSwitchProps = {
  isOn: boolean;
  onToggle: () => void;
  onColor?: string;
  id?: string;
};

const CustomSwitch: FC<CustomSwitchProps> = ({
  id: givenId,
  isOn,
  onToggle,
  onColor = '#EF476F',
}) => {
  const id = givenId ?? 'custom-switch';
  return (
    <>
      <input
        checked={isOn}
        onChange={onToggle}
        className={`${styles['switch-checkbox']}`}
        id={id}
        type="checkbox"
      />
      <label
        style={{ background: isOn ? onColor : undefined }}
        className={`${styles['switch-label']}`}
        htmlFor={id}
      >
        <span className={`${styles['switch-button']}`} />
      </label>
    </>
  );
};

export default CustomSwitch;
