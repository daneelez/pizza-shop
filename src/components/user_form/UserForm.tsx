import './UserForm.css'
import {useUser} from '../../contexts/UserContext'
import {useState} from "react";

const UserForm = () => {
    const {user, login, logout, register} = useUser();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        await login(name, password);
    }

    const handleRegister = async () => {
        await register(name, password);
    }

    const handleLogout = () => {
        logout();
    }

    return (
        <div className="user-form-container">
            <h3 className='user-form-title'>
                {user ? `Здравствуйте, ${user.name}` : "Вход в аккаунт"}
            </h3>
            <div
                className='auth-container'
                style={{display: user ? 'flex' : 'none'}}
            >
                <p className='user-form-description'>
                    Можете переходить к заказам или созданию своего меню
                </p>
            </div>
            <div
                className='auth-container'
                style={{display: !user ? 'flex' : 'none'}}
            >
                <input
                    className='user-form-input'
                    type="text"
                    placeholder="Имя пользователя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className='user-form-input'
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div
                className='auth-container'
                style={{display: !user ? 'flex' : 'none'}}
            >
                <button
                    className='login-button'
                    onClick={handleLogin}
                >
                    Войти
                </button>
                <button
                    className='register-button'
                    onClick={handleRegister}
                >
                    Создать аккаунт
                </button>
            </div>
            <div
                className='auth-container'
                style={{display: user ? 'flex' : 'none'}}
            >
                <button
                    className='login-button'
                    onClick={handleLogout}
                >
                    Выйти
                </button>
            </div>
        </div>
    );
}

export default UserForm;