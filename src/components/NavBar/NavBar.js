import './NavBar.css'
import icono from './icono-sushi.svg';
import CartWidget from '../CartWidget/CartWidget.js';
import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'


const NavBar = () => {

    const [categories, setCategories] = useState([])

    useEffect(() => {
    const categoriesRef = query(collection(db, 'categories'), orderBy('order'))

    getDocs(categoriesRef)
        .then(snapshot => {
            const categoriesAdapted = snapshot.docs.map(doc => {
            const data = doc.data()
            return { id: doc.id, ...data }
            })
            setCategories(categoriesAdapted)
        }).catch(error => {
            return error
        })
    }, [])

return(

    <nav className="navbar NavBar navbar-expand-md navbar-light">

        <div class="container-fluid navigation">

            <div class="navbar-brand iconoSushi">
                <NavLink to='/' className= 'nav-link' > <img src={icono} className="imgIconoSushi" alt="icono de sushi" /></NavLink>

                <div class="iconoSushiTexto">
                    <b>Ohashi</b>
                    <p>Comida Japonesa</p>
                </div>
            </div>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="linksNav navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <NavLink to='/' className= 'nav-link' >Inicio</NavLink>
                    </li>
                    <li class="nav-item">
                    <NavLink to='/category/entradas' className= 'nav-link' >Entradas</NavLink>
                    </li>
                    <li class="nav-item">
                    <NavLink to='/category/especialidades' className= 'nav-link'>Especialidades</NavLink>
                    </li>
                    <li class="nav-item">
                        <NavLink to='/category/postres' className= 'nav-link'>Postres</NavLink>
                    </li>
                </ul>
                
                <CartWidget/>

            </div>

        </div>

    </nav>

    )

}

export default NavBar
