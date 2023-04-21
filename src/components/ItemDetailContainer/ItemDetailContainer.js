import ItemDetail from "../ItemDetail/ItemDetail"
import { useParams } from 'react-router-dom'
import { getProductsById } from '../../services/firebase/firestore/products'
import { useAsync } from '../../hooks/useAsync'

const ItemDetailContainer = () => {

    const { itemId } = useParams()

    const getProductsWithId = () => getProductsById(itemId)

    const { data: product, error, loading } = useAsync(getProductsWithId, [itemId])

    if(loading) {
        return <h1>Cargando...</h1>
    }

    if(error) {
        return <h1>Vuelva a cargar la pagina</h1>
    }

    return(
        <div className='ItemDetailContainer'>
            <ItemDetail  {...product} />
        </div>
    )
}

export default ItemDetailContainer














/* const ItemDetailContainer = () => {
    const [dishes, setDishes] = useState()
    const [loading, setLoading] = useState(true)

    const { itemId } = useParams()

    useEffect(() => {
        setLoading(true)

        getDishesById(itemId)
            .then(food => {
                setDishes(food)
            })
            .catch(error => {
                console.log(error)
            })
            .finally(() => {
                setLoading(false)
            })
    }, [itemId])

    if(loading) {
        return <h1>Cargando...</h1>
    }

    return (
        <div>
            <h1>Detalle de {dishes.name} </h1>
            <ItemDetail {...dishes}/>
        </div>
    )
}

export default ItemDetailContainer */