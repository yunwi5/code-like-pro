import React from 'react';
import EditorControlBar from '../EditorControlBar';

const EditorOutputSection: React.FC = () => {
    return (
        <div className="flex-1">
            <div className="hidden lg:block">
                <EditorControlBar />
            </div>
            EditorOutputSection
        </div>
    );
};

export default EditorOutputSection;
