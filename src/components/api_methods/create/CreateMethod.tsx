import '../Methods.css'
import CreateIngredient from "./CreateIngredient";
import CreatePizzaBase from "./CreatePizzaBase";

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
        default:
            return null
    }
}

export default CreateMethod;