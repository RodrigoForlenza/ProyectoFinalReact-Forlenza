import './ItemDetail.css' 
import { useContext, useState } from 'react'
import ItemCount from '../ItemCount/ItemCount'
import { CartContext } from '../../context/CartContext'

const ItemDetail = ({ id, name, price, img, description, longDescription, extras, stock }) => {

    const [quantity, setQuantity] = useState(0)
    const { addItem } = useContext(CartContext)

    const handleOnAdd = (quantity) => {
        const productToAdd = {
            id, name, price, quantity, stock
        }
        setQuantity(quantity)
        addItem(productToAdd)
    }

    return (
        <div class = 'itemDetail'>

            <div class="itemDetailImg">
                <img src={img} alt={name} />
            </div>
            
            <div class="itemDetailText">
                <h2>{name}</h2>
                <p>{description}</p>
                <p>{longDescription}</p>
                <p>{extras}</p>
                <h3>Precio: ${price}</h3>
            </div>

            {stock > 0 ? <ItemCount onAdd={handleOnAdd} stock={stock} /> : <div>No hay stock disponible</div>}
            
        </div>
    )
}

export default ItemDetail