import './ItemCount.css'
import { useState } from 'react'

const ItemCount = ({stock = 0, initial = 1, onAdd})=> {
const [quantity, setQuantity] = useState(initial)

const increment = () => {
    if(quantity < stock) {
        setQuantity(quantity + 1)
    }
}

const decrement = () => {
    if(quantity > 1) {
        setQuantity(quantity - 1)
    }     
}

return(
    <div className='Counter'>          
        <div className='Controls'>
            <button className="Button" onClick={decrement}>-</button>
            <h3 className='Number'>{quantity}</h3>
            <button className="Button" onClick={increment}>+</button>
        </div>
        <div>
            <button className="Button" onClick={() => {
                setQuantity(initial)
                onAdd(quantity)
            }}>Agregar</button>
        </div>
    </div>
)

}
export default ItemCount