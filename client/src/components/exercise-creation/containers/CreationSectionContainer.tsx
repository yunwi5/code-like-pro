import React from 'react';

interface Props {
    title: string | JSX.Element;
    children: React.ReactNode;
    id?: string;
    className?: string;
}

const CreationSectionContainer: React.FC<Props> = ({ id, title, className, children }) => {
    return (
        <section className={`flex flex-col gap-3 ${className ?? ''}`} id={id}>
            <h2 className="font-semibold text-xl">{title}</h2>
            {children}
        </section>
    );
};

export default CreationSectionContainer;
