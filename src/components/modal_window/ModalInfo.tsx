import './ModalWindow.css'
import CommandButton from "../command_button/CommandButton";

interface ModalInfoProps {
    title: string;
    item: any;
    onClose: (item: boolean) => void;
    getCount: (item: any) => number;
}

const ModalInfo: React.FC<ModalInfoProps> = ({title, item, onClose, getCount}) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3 className='modal-title'>{title}</h3>
                <h4 className='modal-item-title'>Название куска: {item.name ?? 'custom'}</h4>
                <div className='modal-info-container'>
                    <div className='modal-item'>
                        <p className="modal-list-title">
                            Бортик
                        </p>
                        <ul className='modal-list modal-info-list'>
                            <li>
                                Название: {item.side.name ?? 'базовый'}
                            </li>
                            <li>
                                Ингредиенты: {item.side.ingredients.join(', ') ?? ''}...
                            </li>
                            <li>
                                Цена: {item.side.price ?? 0}₽
                            </li>
                        </ul>
                    </div>
                    <div className='modal-item'>
                        <p className="modal-list-title">
                            Ингредиенты
                        </p>
                        <ul className="modal-list modal-info-list">
                            {item.ingredients && item.ingredients.map((ing: any) => {
                                const count = getCount ? getCount(ing) : 1
                                return (
                                    <li key={ing.id}>
                                        {ing.name} - {ing.price * count}₽ {`(x${count})`}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
                <div className="modal-footer modal-footer-info">
                    <CommandButton size={"small"} type={'white'} title="Назад"
                                   command={() => onClose(false)}/>
                </div>
            </div>
        </div>
    );
}

export default ModalInfo;