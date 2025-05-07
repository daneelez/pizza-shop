import './UserForm.css'
import {useUser} from '../../contexts/UserContext'
import {useState} from "react";
import CommandButton from "../command_button/CommandButton";
import InputField from "../input_field/InputField";

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
                className='input-auth-container'
                style={{display: !user ? 'flex' : 'none'}}
            >
                <InputField type={'text'} placeholder={'Имя пользователя'} value={name}
                            onChangeString={setName} size={'large'}/>
                <InputField type={'password'} placeholder={'Пароль'} value={password}
                            onChangeString={setPassword} size={'large'}/>
            </div>
            <div
                className='auth-container'
                style={{display: !user ? 'flex' : 'none'}}
            >
                <CommandButton size={"large"} type={'white'} command={handleLogin} title={"Войти"}/>
                <CommandButton size={"large"} type={'black'} command={handleRegister} title={"Создать аккаунт"}/>
            </div>
            <div
                className='auth-container'
                style={{display: user ? 'flex' : 'none'}}
            >
                <CommandButton size={"large"} type={'white'} command={handleLogout} title={"Выйти"}/>
            </div>
        </div>
    );
}

export default UserForm;