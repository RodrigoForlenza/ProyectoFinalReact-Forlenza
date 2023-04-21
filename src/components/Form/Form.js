import './Form.css'

const Form = ({submit, change, formValues, orderId}) =>{

return (

    <form className="Form" onSubmit={submit}>
    
    <div className="FormElement">
        <label>Nombre:</label>
        <input name="nombre" type="text" value={formValues.nombre} onChange={change}/>
    </div>

    <div className="FormElement">
        <label>Apellido:</label>
        <input name="apellido" type="text" value={formValues.apellido} onChange={change}/>
    </div>

    <div className="FormElement">
        <label>E-mail:</label>
        <input name="email" type="email" value={formValues.email} onChange={change}/>
    </div>


{ orderId ? <h2>El id de su orden es: {orderId}</h2> : (formValues.nombre && formValues.apellido && formValues.email ? <button type="submit">Generar orden</button> : <button disabled={true} type="submit">Generar orden</button>) }


</form>

)}


export default Form