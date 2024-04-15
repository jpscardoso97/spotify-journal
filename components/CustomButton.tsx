import React from 'react';

interface CustomButtonProps {
    onClick: () => void;
    label: string;
    disabled: boolean;
}

export default function CustomButton({ onClick, label, disabled }: CustomButtonProps) {
    const color = disabled ? "bg-gray" : "bg-black";

    return (
        <button disabled={disabled} className={`mt-8 ${color} hover:bg-gray text-white-700 font-semibold hover:text-white py-2 px-4 border border-gray-500 hover:border-transparent rounded`} onClick={onClick}>
            {label}
        </button>
    );
}
