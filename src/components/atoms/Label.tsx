interface LabelProps {
    text: string;
    htmlFor: string;
}

export const Label = ({ text, htmlFor }: LabelProps) => (
    <label
        htmlFor={htmlFor}
        className="block text-text font-bold mb-2 text-sm uppercase tracking-wide"
    >
        {text}
    </label>
);