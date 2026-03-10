"use client";
import { useEffect, useState } from 'react';
import { MathSymbol } from '../atoms/MathSymbol';
import { Bubble } from '../atoms/Bubble';

export const MathBackground = () => {
    const [isMounted, setIsMounted] = useState(false);
    const symbols = ['+', '−', '×', '÷', '=', '∑', 'π', '√'];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none bg-bg-secondary/20">
            <Bubble className="w-64 h-64 top-[-50px] left-[-50px] animate-float" />
            <Bubble className="w-40 h-40 bottom-10 right-10 animate-spin-slow" />

            {symbols.map((sym, i) => (
                <MathSymbol
                    key={i}
                    char={sym}
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        fontSize: `${Math.random() * 2 + 1}rem`,
                        animationDelay: `${i * 0.5}s`
                    }}
                />
            ))}
        </div>
    );
};