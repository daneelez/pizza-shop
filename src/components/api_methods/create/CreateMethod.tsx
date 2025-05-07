import '../Methods.css'
import CreateIngredient from "./CreateIngredient";
import CreatePizzaBase from "./CreatePizzaBase";
import CreatePizzaSide from "./CreatePizzaSide";
import CreatePizza from "./CreatePizza";

interface CreateMethodProps {
    userID: string,
    focus: string,
}

const CreateMethod: React.FC<CreateMethodProps> = ({userID, focus}) => {
    switch (focus) {
        case 'ingredients':
            return (<CreateIngredient userID={userID}/>);
        case 'bases':
            return (<CreatePizzaBase userID={userID}/>);
        case 'sides':
            return (<CreatePizzaSide userID={userID}/>);
        case 'pizza':
            return (<CreatePizza userID={userID}/>);
        default:
            return null
    }
}

export default CreateMethod;