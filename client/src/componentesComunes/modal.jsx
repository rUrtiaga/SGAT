const React = require('react');
const { Button, Modal, ModalHeader, ModalBody, ModalFooter } = require('reactstrap');
/**,UncontrolledAlert
 * pasar className, onCancel, onAccept
 */
class ModalSGAT extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  aceptar(){
      this.props.onAccept().then(r=>{
        this.setState({
          alerta: {color:"success",message:"se agrego correctamente"}
        })
      }).catch(e=>{
        this.setState({
          alerta: {color:"danger",message:"hubo un error"}
        })
      })

      // this.toggle()
  }

  render() {
    return (
      <React.Fragment>
        <Button color={this.props.color} onClick={this.toggle}>{this.props.buttonLabel}</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className} centered={true}>
          {/* {(this.state.alerta)?<UncontrolledAlert color={this.state.alerta.color}> {this.state.alerta.message} </UncontrolledAlert>:null} */}
          <ModalHeader toggle={this.toggle}> {this.props.title}</ModalHeader>
          <ModalBody>
              {this.props.body}
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancelar</Button>
            <Button color="primary" onClick={()=>this.aceptar()}>Aceptar</Button>{' '}
          </ModalFooter>
        </Modal>
      </React.Fragment>
    );
  }
}

exports.ModalSGAT = ModalSGAT;