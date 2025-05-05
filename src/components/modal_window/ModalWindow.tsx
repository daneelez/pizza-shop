import CommandButton from "../command_button/CommandButton";

interface ModalWindowProps {
    title: string;
    list: any[];
    onChecked: (item: any) => boolean;
    onChange: (item: any) => void;
    onToggle: (item: boolean) => void;
}

const ModalWindow: React.FC<ModalWindowProps> = ({title, list, onChecked, onToggle, onChange}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className='modal-title'>{title}</h3>
                <ul className="modal-list">
                    {list.map((item) => (
                        <div key={item.id}>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={onChecked(item)}
                                    onChange={() => onChange(item)}
                                />
                                {item.name} - {item.price}₽
                            </label>
                        </div>
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