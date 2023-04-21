import './CartWidget.css'
import icono from './icono-carrito.svg';
import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'


const CartWidget = () => {

    const { totalQuantity } = useContext(CartContext)

    const navigate = useNavigate()

    return  (

    <div className="CartWidget IconoUsuarioCarrito" onClick={() => navigate('/cart')}>
        <img src={icono} alt='cart' width="40"/>
        {totalQuantity}
    </div>
    )
}

export default CartWidget