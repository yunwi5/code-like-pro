import React from 'react';
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
                    <p className="flex-start gap-2">
                        We encourage you to join our challenge showcase forums and showcase
                        your amazing work!
                    </p>
                    <p className="flex-start gap-2">
                        Your participation in the showcases will contribute to your rankings as
                        well!
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
