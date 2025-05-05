import '../Methods.css'
import RemoveIngredient from "./RemoveIngredient";
import RemovePizzaBase from "./RemovePizzaBase";

interface RemoveMethodProps {
    userID: string,
    focus: string,
}

const RemoveMethod: React.FC<RemoveMethodProps> = ({userID, focus}) => {
    switch (focus) {
        case 'ingredients':
            return (<RemoveIngredient userID={userID}/>);
        case 'bases':
            return (<RemovePizzaBase userID={userID}/>);
        default:
            return null
    }
}

export default RemoveMethod;