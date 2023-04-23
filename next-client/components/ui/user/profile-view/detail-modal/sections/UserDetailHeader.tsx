import React from 'react';
import { MdEmail } from 'react-icons/md';

import { IUserInfo } from '../../../../../../models/interfaces';
import ProfilePicture from '../../../ProfilePicture';

const UserDetailHeader: React.FC<{ userInfo: IUserInfo }> = ({ userInfo }) => {
  return (
    <header className="flex-start flex-wrap gap-4 px-7 py-4 shadow-md border-b-2 border-main-300/90">
      <ProfilePicture size="3.5rem" picture={userInfo.picture} alt={userInfo.name} />
      <h2 className="flex-start gap-2 mr-auto text-xl sm:text-3xl">{userInfo.name}</h2>
      <a href={`mailto:${userInfo.email}`} className="btn btn-fill btn-small flex-center gap-2">
        <MdEmail /> Contact
      </a>
    </header>
  );
};

export default UserDetailHeader;
