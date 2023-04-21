import { Link } from "react-router-dom"
import './Item.css'

const Item = ({ id, name, price, img, description }) => {
    return (
        <div class="item">
            <img src={img} />
            <h2>{name}</h2>
            <p>{description}</p>
            <h3>Precio: ${price}</h3>
            <div class="link">
                <Link to={`/item/${id}`}>Ver más</Link>
            </div>
        </div>
    )
}

export default Item