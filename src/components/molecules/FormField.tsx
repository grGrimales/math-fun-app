import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText: string;
    error?: string;
}

export const FormField = ({ labelText, error, id, ...props }: FormFieldProps) => {
    return (
        <div className="flex flex-col w-full mb-4">
            <Label text={labelText} htmlFor={id || ''} />

            <Input id={id} {...props} />

            {error && (
                <span className="text-red-500 text-xs mt-1 font-bold animate-soft-pulse">
                    {error}
                </span>
            )}
        </div>
    );
};