import './ItemListContainer.css'
import { memo } from 'react'
import { useParams } from 'react-router-dom'
import ItemList from '../ItemList/ItemList'
import { getProducts } from '../../services/firebase/firestore/products'
import { useAsync } from '../../hooks/useAsync'


const ItemListMemo = memo(ItemList)

const ItemListContainer = ({ greeting }) => {
    const { categoryId } = useParams()
    
    const getProductsWithCategory = () => getProducts(categoryId)

    const { data: dishes, error, loading } = useAsync(getProductsWithCategory, [categoryId])

    if(loading) {
        return <h1>Cargando...</h1>
    }

    if(error) {
        return <h1>Vuelva a cargar la pagina</h1>
    }

    if(categoryId){

        const categoryCap = categoryId.charAt(0).toUpperCase() + categoryId.slice(1); 

        return (
            <div class = "itemListContainer">
                <h1>{categoryCap}</h1>
                <ItemListMemo dishes={dishes}/>
            </div>
        )  

    } else {
        
        return (
            <div class = "itemListContainer">
                <h1>{greeting}</h1>
                <ItemListMemo dishes={dishes}/>
            </div>
        )
    }

}

export default ItemListContainer
