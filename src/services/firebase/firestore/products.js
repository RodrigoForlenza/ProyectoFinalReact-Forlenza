import { getDocs, collection, query, where } from 'firebase/firestore'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { createAdaptedProductFromFirestore } from '../../../adapters/createAdaptedProductFromFirestore'

export const getProducts = (categoryId) => {
    const productsRef = categoryId 
    ? query(collection(db, 'dishes'), where('category', '==', categoryId))
    : collection(db, 'dishes')

    return getDocs(productsRef)
        .then(snapshot => {
            const productsAdapted = snapshot.docs.map(doc => {
                return createAdaptedProductFromFirestore(doc)
            })

            return productsAdapted
        })
        .catch(error => {
            return error
        })

}

export const getProductsById = (itemId) => {
    const productRef = doc(db, 'dishes', itemId)

    return getDoc(productRef)
        .then(snapshot => {
            const data = snapshot.data()
            const productAdapted = { id: snapshot.id, ...data}
            return productAdapted
        }).catch(error => {
            return error
        })
}