import '../Methods.css'
import UpdateIngredient from "./UpdateIngredient";
import UpdatePizzaBase from "./UpdatePizzaBase";
import UpdatePizzaSide from "./UpdatePizzaSide";
import UpdatePizza from "./UpdatePizza";

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
        case 'sides':
            return (<UpdatePizzaSide userID={userID}/>);
        case 'pizza':
            return (<UpdatePizza userID={userID}/>);
        default:
            return null
    }
}

export default UpdateMethod;