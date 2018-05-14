 const React = require('react')

class NuevoAlumno extends React.Component{

    render(){
        return (
            <div className="container">
                <h3 className="mt-4 mb-4">Nueva Inscripcion</h3>
                {/*Acá deberia ir el componente que seleccionas categoria taller nivel */}
                <div className="form-group">
                    <label htmlFor="Curso">Curso</label>
                    <select className="form-control" id="cursos">
                        <option>Ceramica: Principiantes</option>
                        <option>Ceramica: Avanzados</option>
                        <option>Pintura</option>
                        <option>Tallado en madera</option>
                    </select>
                </div>
                 <InputPersona/>
            </div>
        )
    }
}

class InputPersona extends React.Component{

    render(){
        return(
            <React.Fragment>
                <div className="form-group">
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="name">D.N.I.</label>
                            <input type="number" className="form-control" id="name" placeholder="D.N.I."/>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="name">Nombre</label>
                            <input type="text" className="form-control" id="name" placeholder="introduzca Nombre"/>
                        </div>
                        <div className="col">
                            <label htmlFor="lastname">Apellido</label>
                            <input type="text" className="form-control" id="lastname" placeholder="introduzca Apellido"/>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <h4 className="mt-4 mb-4" htmlFor="contact">Contacto</h4>
                    <div className="form-row">
                        <div className="col">
                            <label htmlFor="pPhone">Telefono Principal</label>
                            <input type="number" className="form-control" id="phone" placeholder="formato: 0224345XXXX"/>
                        </div>
                        <div className="col">
                            <label htmlFor="sPhone">Secundario</label>
                            <input type="number" className="form-control" id="aphone" placeholder="formato: 0224345XXXX"/>
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlInput1">Correo Electronico</label>
                    <input type="email" className="form-control" id="email" placeholder="nombre@dominio.com"/>
                </div>

                <div className="form-group">
                    <label htmlFor="exampleFormControlTextarea1">Comentario</label>
                    <textarea className="form-control" id="comment" rows="3"></textarea>
                </div>
                <div className="row justify-content-end">
                    <div className="col-md-2">
                        <button type="submit" className='btn btn-danger'>Cancelar</button>
                    </div>
                    <div className="col-md-2">
                        <button type="submit" className='btn btn-primary'>Aceptar</button>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

exports.NuevoAlumno= NuevoAlumno