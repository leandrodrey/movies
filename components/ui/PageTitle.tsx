import React, { FC } from 'react';

interface PageTitleProps {
    text: string;
}

const PageTitle: FC<PageTitleProps> = ({ text }) => {
    return (
        <h2 className="text-center text-2xl font-semibold text-gray-300 mb-4">{text}</h2>
    );
};

export default PageTitle;
