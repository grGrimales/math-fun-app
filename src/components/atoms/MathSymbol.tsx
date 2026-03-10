import React from 'react';

interface MathSymbolProps {
    char: string;
    style?: React.CSSProperties;
}

export const MathSymbol: React.FC<MathSymbolProps> = ({ char, style }) => {

    return (
        <span
            className="math-symbol text-primary animate-float pointer-events-none"
            style={style}
            aria-hidden="true"
        >
            {char}
        </span>
    );
};