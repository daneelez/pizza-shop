import CommandButton from "../command_button/CommandButton";

interface ModalWindowProps {
    title: string;
    list: any[];
    onChecked: (item: any) => boolean;
    onChange: (item: any) => void;
    onToggle: (item: boolean) => void;
    type: 'alone' | 'many';
}

const ModalWindow: React.FC<ModalWindowProps> = ({title, list, onChecked, onToggle, onChange, type}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className='modal-title'>{title}</h3>
                <ul className="modal-list">
                    {list.map((item) => (
                        <li key={item.id}>
                            <label>
                                {type === "many" ? (
                                    <input
                                        type="checkbox"
                                        checked={onChecked(item)}
                                        onChange={() => onChange(item)}
                                    />
                                ) : (
                                    <input
                                        type="radio"
                                        checked={onChecked(item)}
                                        onChange={() => onChange(item)}
                                    />)}
                                {item.name} - {item.price}₽
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="modal-footer">
                    <CommandButton size={"large"} type={'black'} title="Применить"
                                   command={() => onToggle(false)}/>
                    <CommandButton size={"small"} type={'white'} title="Назад"
                                   command={() => onToggle(false)}/>
                </div>
            </div>
        </div>
    );
}

export default ModalWindow;