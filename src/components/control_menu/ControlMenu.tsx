import './ControlMenu.css'
import CommandButton from "../command_button/CommandButton";

interface ControlMenuProps {
    onClick: (value: string) => void;
    backState: (value: string) => void;
}

const ControlMenu: React.FC<ControlMenuProps> = ({onClick, backState}) => {
    return (
        <div className='create-focus-section'>
            <CommandButton size={"large"} type={'black'} command={() => onClick('create')}
                           title={"Создать"}/>
            <CommandButton size={"large"} type={'black'} command={() => onClick('update')}
                           title={"Изменить"}/>
            <CommandButton size={"large"} type={'black'} command={() => onClick('remove')}
                           title={"Удалить"}/>
            <CommandButton size={"large"} type={'black'} command={() => backState('')}
                           title={"Назад"}/>
        </div>
    );
}

export default ControlMenu;