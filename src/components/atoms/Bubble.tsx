import React from 'react';

interface BubbleProps {
    className?: string;
}

export const Bubble: React.FC<BubbleProps> = ({ className }) => {

    return (
        <div
            className={`bubble pointer-events-none ${className || ''}`}
            aria-hidden="true"
        />
    );
};