import Link from 'next/link';
import { RiEmotionSadLine } from 'react-icons/ri';

import { IExerciseWithId } from '../../../models/interfaces';
import {
  getBrowsingPageLink,
  getExerciseCreationPageLink,
} from '../../../utils/links.util';

interface MessageProps {
  exercises: IExerciseWithId[];
  inviteMode: 'created' | 'solved';
}
// If the user did not create exercises, display messages and links for users to start creating or solving exercises.
const ShowCaseInviteMessage: React.FC<MessageProps> = ({ exercises, inviteMode }) => {
  if (exercises.length > 0) return null;

  return (
    <div className="mt-7 py-5 flex-center flex-col gap-3">
      <h2 className="flex-center gap-2 text-xl">
        <RiEmotionSadLine className="text-main-500 text-3xl" />
        You have no {inviteMode === 'created' ? 'created' : 'solved'} works to be
        showcased.
      </h2>
      <Link
        href={
          inviteMode === 'created' ? getExerciseCreationPageLink() : getBrowsingPageLink()
        }
        className="btn btn-empty"
      >
        {inviteMode === 'created' ? 'Create' : 'Solve'} One!
      </Link>
    </div>
  );
};

export default ShowCaseInviteMessage;
