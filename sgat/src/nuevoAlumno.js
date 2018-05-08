 const React = require('react')

class NuevoAlumno extends React.Component{
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render(){
        return (
            <div class="container">
            <form>
                <h3 class="mt-4 mb-4">Nueva Inscripcion</h3>
                <div class="form-group">
                    <label for="Curso">Curso</label>
                    <select class="form-control" id="cursos">
                        <option>Ceramica: Principiantes</option>
                        <option>Ceramica: Avanzados</option>
                        <option>Pintura</option>
                        <option>Tallado en madera</option>
                    </select>
                </div>
    
                <div class="form-group">
                    <div class="form-row">
                        <div class="col">
                            <label for="name">D.N.I.</label>
                            <input type="number" class="form-control" id="name" placeholder="Juan">
                        </div>
                    </div>
                </div>
    
                <div class="form-group">
                    <div class="form-row">
                        <div class="col">
                            <label for="name">Nombre</label>
                            <input type="text" class="form-control" id="name" placeholder="introduzca Nombre">
                        </div>
                        <div class="col">
                            <label for="lastname">Apellido</label>
                            <input type="text" class="form-control" id="lastname" placeholder="introduzca Apellido">
                        </div>
                    </div>
                </div>
    
                <div class="form-group">
                    <h4 class="mt-4 mb-4" for="contact">Contacto</h4>
                    <div class="form-row">
                        <div class="col">
                            <label for="pPhone">Telefono Principal</label>
                            <input type="number" class="form-control" id="phone" placeholder="formato: 0224345XXXX">
                        </div>
                        <div class="col">
                            <label for="sPhone">Secundario</label>
                            <input type="number" class="form-control" id="aphone" placeholder="formato: 0224345XXXX">
                        </div>
                    </div>
                </div>
    
                <div class="form-group">
                    <label for="exampleFormControlInput1">Correo Electronico</label>
                    <input type="email" class="form-control" id="email" placeholder="nombre@dominio.com">
                </div>
    
                <div class="form-group">
                    <label for="exampleFormControlTextarea1">Comentario</label>
                    <textarea class="form-control" id="comment" rows="3"></textarea>
                </div>
                <div class="row justify-content-end">
                    <div class="col-md-2">
                        <button type="submit" class='btn btn-danger'>Cancelar</button>
                    </div>
                    <div class="col-md-2">
                        <button type="submit" class='btn btn-primary'>Aceptar</button>
                    </div>
                </div>
            </form>
        </div>
        )
    }
}
