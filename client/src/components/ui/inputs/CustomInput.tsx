import React from "react";

const CustomInput = (props: {
  type: string;
  placeholder: string;
  className?: string;
  labelText?: string;
  id?: string;
}) => {
  return (
    <input
      className="w-full text-sm my-3 h-9 p-3 bg-grey-200 border-grey-700 border-b-[1.5px]"
      id={props.id}
      type={props.type}
      placeholder={props.placeholder}
    ></input>
  );
};

export default CustomInput;
