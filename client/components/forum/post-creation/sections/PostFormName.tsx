import React from 'react';
import { usePostCreationContext } from '../../../../store/context/PostCreationContext';
import CustomInput from '../../../ui/inputs/CustomInput';

const PostFormName: React.FC = () => {
  const { name, setName } = usePostCreationContext();

  return (
    <CustomInput
      value={name}
      onChange={(newName: string) => setName(newName)}
      labelText="Title"
      className="text-lg"
      placeholder="Enter post title"
    />
  );
};

export default PostFormName;
