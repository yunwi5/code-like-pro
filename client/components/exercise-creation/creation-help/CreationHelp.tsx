import React, { useState } from 'react';
import { FiHelpCircle } from 'react-icons/fi';
import { Language } from '../../../models/enums';
import CreationHelpModal from './CreationHelpModal';

interface Props {
  defaultLanguage?: Language;
  className?: string;
}

const CreationHelp: React.FC<Props> = (props) => {
  const { defaultLanguage, className = '' } = props;
  // Help modal visibility
  const [showModal, setShowModal] = useState(false);

  return (
    <div className={`text-gray-600 text-base ${className}`}>
      <button
        onClick={() => setShowModal(true)}
        className="flex-center gap-1 group px-3 py-[0.3rem] font-semibold rounded-full hover:bg-main-400 hover:text-white hover:shadow-md"
      >
        <FiHelpCircle className="text-main-500 group-hover:text-main-50 text-[1.3em]" />
        Help
      </button>

      <CreationHelpModal
        key={defaultLanguage}
        open={showModal}
        onClose={() => setShowModal(false)}
        defaultLanguage={defaultLanguage}
      />
    </div>
  );
};

export default CreationHelp;
