import './InputField.css'

interface InputFieldProps {
    type: 'text' | 'number' | 'password' | 'email' | 'password_confirmation'
    placeholder: string
    value: string
    onChange?: (value: string) => void;
}

const InputField: React.FC<InputFieldProps> = ({type, placeholder, value, onChange}) => {
    return (
        <input
            className='input-field'
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange && onChange(e.target.value)}
        />
    );
}

export default InputField;