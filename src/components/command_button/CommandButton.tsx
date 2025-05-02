import './CommandButton.css'

interface CommandButtonProps {
    size: "small" | "medium" | "large"
    type: "dark" | "white" | "black"
    command: () => void
    title: string
    isActive?: boolean
}

const CommandButton: React.FC<CommandButtonProps> = ({size, type, command, title, isActive}) => {
    let width, height;

    switch (size) {
        case "small":
            width = 4
            height = 3
            break;
        case "medium":
            width = 11
            height = 4.5
            break
        case "large":
            width = 16
            height = 2
            break;
    }

    const activeClass = isActive ? 'command-button-active' : '';

    return (
        <button
            className={`command-button-${type} ${activeClass}`}
            style={{width: `${width}rem`, height: `${height}rem`}}
            onClick={command}
        >
            {title}
        </button>
    );
}

export default CommandButton;