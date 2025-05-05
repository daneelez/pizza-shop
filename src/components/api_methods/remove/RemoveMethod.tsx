import '../Methods.css'
import RemoveIngredient from "./RemoveIngredient";
import RemovePizzaBase from "./RemovePizzaBase";
import RemovePizzaSide from "./RemovePizzaSide";

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
        case 'sides':
            return (<RemovePizzaSide userID={userID}/>);
        default:
            return null
    }
}

export default RemoveMethod;