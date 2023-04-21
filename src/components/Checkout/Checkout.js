import './Checkout.css'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { db } from '../../services/firebase/firebaseConfig'
import { documentId, getDocs, query, collection, where, writeBatch, addDoc } from 'firebase/firestore'
import { useNotification } from '../../notification/NotificationService'
import { useNavigate } from 'react-router-dom'
import Form from '../Form/Form'

const Checkout = () => {
    const [orderId, setOrderId] = useState('') 
    const [loading, setLoading] = useState(false)
    const { cart, total, clearCart } = useContext(CartContext)
    const { setNotification } = useNotification()
    const navigate = useNavigate()

    const [formValues, setFormValues] = useState({
        nombre: "",
        apellido: "",
        email: "",
    })

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
    }


    const handleConfirm = async (e) => {

        e.preventDefault();
        setFormValues({nombre: "", apellido: "", email: ""});

        try{ 

            setLoading(true)
            const objOrder = {
                
                buyer: {
                    formValues
                },
                items: cart,
                total: total
            }

            const ids = cart.map(prod => prod.id)

            const productRef = query(collection(db, 'dishes'), where(documentId(), 'in', ids))

            const productsAddedFromFirestore = await getDocs(productRef)

            const { docs } = productsAddedFromFirestore

            const batch = writeBatch(db)
            const outOfStock = []

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock

                const productAddedToCart = cart.find(prod => prod.id === doc.id)

                const prodQuantity = productAddedToCart?.quantity

                if(stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity})
                } else {
                    outOfStock.push({ id: doc, ...dataDoc})
                }
            })

            if(outOfStock.length === 0) {
                batch.commit()

                const orderRef = collection(db, 'orders')

                const orderAdded = await addDoc(orderRef, objOrder)
                clearCart()
                setOrderId(orderAdded.id)

                setTimeout(() => {
                    navigate('/')
                }, 3000)

            } else {
                setNotification('error', 'Hay productos que no tienen stock disponible')
            } 
        } catch (error) {
            setNotification('error', 'Hubo un error generando la orden')
        } finally {
            setLoading(false)
            setOrderId('')
        }
    }
    
    if(loading) {
        return <h1>Su orden está siendo generada...</h1>
    }

    return (
        <div>
            <h1>Checkout</h1>
            <Form submit={handleConfirm} change={handleChange} formValues={formValues} orderId={orderId}/> 
        </div>
    )
}

export default Checkout