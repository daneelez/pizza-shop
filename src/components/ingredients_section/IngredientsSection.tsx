import './IngredientsSection.css'
import IngredientCard from "../Ingredient_card/IngredientCard";
import CreateCard from "../create_card/CreateCard";
import {useEffect, useState} from "react";
import {useCRUD} from "../../hooks/useCRUD"
import {useUser} from "../../contexts/UserContext";

interface IngredientResponse {
    id: string;
    name: string;
    price: number;
}

interface PizzaSectionProps {
    createCard?: boolean;
    onCreateCard?: () => void;
}

const IngredientsSection: React.FC<PizzaSectionProps> = ({createCard, onCreateCard}) => {
    const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
    const {getAll} = useCRUD<IngredientResponse, any>('ingredients');
    const {user} = useUser();

    useEffect(() => {
        if (!user) setIngredients([]);
        else {
            getAll(user.id).then(res =>
                res.data ? setIngredients(res.data) : setIngredients([]));
        }
    }, [user]);

    return (
        <section className="ingredient-section">
            <ul className="ingredient-list">
                {ingredients.map(ingredient => (
                    <IngredientCard
                        key={ingredient.id}
                        name={ingredient.name}
                        price={ingredient.price}
                    />
                ))}
                <CreateCard type='ingredient' onCreate={() => onCreateCard}/>
            </ul>
        </section>
    );
}

export default IngredientsSection;