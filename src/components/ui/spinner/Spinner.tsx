import React from 'react';

interface Props {
    color?:string;
    size?: number;
    thickness?:number;
    speed?:number;
    textLoader?: string;
}

export const Spinner = ({color='black', size=80, thickness=3, speed=1, textLoader="Cargando..."}:Props) => {
    return (
        <div className='w-full h-full flex justify-center items-center flex-col gap-2'>
            <svg
                width={size}
                height={size}
                viewBox="0 0 50 50"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                style={{ display: "block" }}
            >
                <circle
                    cx="25"
                    cy="25"
                    r="20"
                    fill="none"
                    stroke={color}
                    strokeWidth={thickness}
                    strokeLinecap="round"
                    strokeDasharray="31.4 94.2"
                >
                    <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 25 25"
                    to="360 25 25"
                    dur={`${speed}s`}
                    repeatCount="indefinite"
                    />
                </circle>
                </svg>
            <p className='text-base sm:text-2xl'>{textLoader}</p>
        </div>
    );
}