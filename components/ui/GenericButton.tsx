import {FC} from 'react';

interface BackButtonProps {
        text: string;
}

const GenericButton: FC<BackButtonProps> = ({text}) => {
    return (
        <>
            <button className="
                bg-red-900 text-white px-4 py-1 rounded text-sm
                hover:bg-red-700 hover:scale-110
                active:bg-red-500
                transition-all duration-200
                ">
                {text}
            </button>
        </>
    )
}

export default GenericButton;
