import React from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { CodeMonitor } from '../../assets';

// Header of the showcases invite page.
// Encouraging header and messages on the left, showcase svg image on the right.
const ShowCaseInviteHeader: React.FC = () => {
    return (
        <header className="flex items-center justify-between">
            <div>
                <h1 className="text-main-500/90 text-2xl lg:text-4xl capitalize">
                    Please join our <span className="text-purple-600">showcase forums!</span>
                </h1>
                <div className="mt-5 text-[1.075rem] text-gray-500">
                    <p>
                        We encourage you to join our challenge showcase forums and showcase
                        your amazing work!
                    </p>
                    <p>
                        Your participation in the showcases will contribute to your rankings as
                        well!
                    </p>
                    <p className="flex-start gap-1 text-stone-500 text-base">
                        <AiOutlineWarning className="text-stone-500" />
                        You can only join showcases for the exercises that you created or
                        solved.
                    </p>
                </div>
            </div>
            <CodeMonitor size={'13.5rem'} />
        </header>
    );
};

// This header component does not have to re-redner as the data is static.
// Hence, prevents unnecessary re-render with React.memo().
export default React.memo(ShowCaseInviteHeader);
