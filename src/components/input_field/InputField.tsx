import './InputField.css'

interface InputFieldProps {
    type: 'text' | 'number' | 'password' | 'email'
    size: 'small' | 'medium' | 'large'
    placeholder: string
    value: string | number
    onBlurNumber?: (value: number) => void;
    onChangeString?: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = (
    {type, placeholder, value, onBlurNumber, onChangeString, size}) => {
    const classSize = 'input-field-' + size;

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (type === 'number') {
            const parsed = parseFloat(e.target.value)
            if (!isNaN(parsed)) {
                onBlurNumber?.(parsed)
            }
        }
    }

    return (
        <input
            className={`input-field ${classSize}`}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChangeString?.(e.target.value)}
            onBlur={handleBlur}
        />
    );
}

export default InputField;