import './Navigation.css'

interface NavigationProps {
    onPageChange: (page: string) => void;
    page: string;
}

const Navigation: React.FC<NavigationProps> = ({onPageChange, page}) => {
    return (
        <nav className="nav-container">
            <ul className="nav-list">
                <li className="nav-item">
                    <button className={page === 'home' ? 'active' : ''}
                            onClick={() => onPageChange('home')}>
                        Меню
                    </button>
                </li>
                <li className="nav-item">
                    <button className={page === 'orders' ? 'active' : ''}
                            onClick={() => onPageChange('orders')}>
                        Заказы
                    </button>
                </li>
                <li className="nav-item">
                    <button className={page === 'create' ? 'active' : ''}
                            onClick={() => onPageChange('create')}>
                        Создать
                    </button>
                </li>
                <li className="nav-item">
                    <button className={page === 'account' ? 'active' : ''}
                            onClick={() => onPageChange('account')}>
                        Аккаунт
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;