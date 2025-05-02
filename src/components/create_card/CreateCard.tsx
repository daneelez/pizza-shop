import './CreateCard.css'
import IconPlus from "../icons/IconPlus";
import {useResize} from "../../hooks/useResize";

interface CreateCardProps {
    type: 'pizza' | 'base' | 'ingredient' | 'side'
    onCreate: () => void
}

const CreateCard: React.FC<CreateCardProps> = ({type, onCreate}) => {
    const pixelSize = useResize(6, 350, 100, 'width')

    return (
        <>
            {type === 'pizza' &&
                <div className='pizza-card-container create-card'
                     style={{alignItems: 'center', justifyContent: 'center'}}
                     onClick={onCreate}
                >
                    <IconPlus size={pixelSize}/>
                </div>
            }

            {type === 'ingredient' &&
                <div className="ingredient-card-container create-card"
                     style={{alignItems: 'center', justifyContent: 'center'}}
                     onClick={onCreate}
                >
                    <IconPlus size={pixelSize}/>
                </div>
            }
        </>
    );
}

export default CreateCard;