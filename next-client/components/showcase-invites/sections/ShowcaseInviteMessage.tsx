import Link from 'next/link';

import { IExerciseWithId } from '../../../models/interfaces';
import { getBrowsingPageLink, getExerciseCreationPageLink } from '../../../utils/links.util';

interface MessageProps {
  exercises: IExerciseWithId[];
  inviteMode: 'created' | 'solved';
}
const ShowCaseInviteMessage: React.FC<MessageProps> = ({ exercises, inviteMode }) => {
  if (exercises.length > 0) return null;

  return (
    <div className="mt-7 px-10 py-5 flex-center flex-col gap-3">
      <h2 className="text-xl text-center">
        You have no {inviteMode === 'created' ? 'created' : 'solved'} works to be showcased.
      </h2>
      <Link
        href={inviteMode === 'created' ? getExerciseCreationPageLink() : getBrowsingPageLink()}
        className="btn btn-empty"
      >
        {inviteMode === 'created' ? 'Create' : 'Solve'} One!
      </Link>
    </div>
  );
};

export default ShowCaseInviteMessage;
