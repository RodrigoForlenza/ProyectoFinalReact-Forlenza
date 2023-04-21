import { useContext } from 'react'
import { CartContext } from '../../context/CartContext'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const { cart, total, clearCart } = useContext(CartContext)
    const navigate = useNavigate()

    return (
        <div>
            <h1>Carrito</h1>

            <div>
            {
                cart.map(prod => {

                    const totalProducts = prod.price * prod.quantity;

                    return (                       
                            <div key={prod.id}>
                                <p>{prod.name} x {prod.quantity}: ${totalProducts}</p>
                            </div>
                    )
                })
            }
            </div>

            {total !== 0 ? <div> <p>Total: ${total}</p> <button onClick={() => navigate('/checkout')}>Finalizar Compra</button> <button onClick={clearCart}>Vaciar Carrito</button> </div> : <p>El carrito está vacío.</p> }


        </div>
    )
}

export default Cart



