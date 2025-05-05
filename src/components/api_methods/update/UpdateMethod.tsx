import '../Methods.css'
import UpdateIngredient from "./UpdateIngredient";
import UpdatePizzaBase from "./UpdatePizzaBase";

interface UpdateMethodProps {
    userID: string,
    focus: string,
}

const UpdateMethod: React.FC<UpdateMethodProps> = ({userID, focus}) => {
    switch (focus) {
        case 'ingredients':
            return (<UpdateIngredient userID={userID}/>);
        case 'bases':
            return (<UpdatePizzaBase userID={userID}/>);
        default:
            return null
    }
}

export default UpdateMethod;