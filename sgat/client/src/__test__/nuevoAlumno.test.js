const React = require("react");
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const shallow = Enzyme.shallow;
const mount = Enzyme.mount;

Enzyme.configure({ adapter: new Adapter() });

const { InputPersona } = require("../componentesComunes/inputPersona.jsx");


var mock = new MockAdapter(axios);

describe("React input Persona", () => {
  it("persona inicializado en vacio", done => {
    let c = shallow(<InputPersona persona={{}} />);

    expect(c.instance()._persona).toEqual({});
    done();
  });
  it("persona inicializado con algunos datos", done => {
    const persona = { _dni: 231, _nombre: "Juanito", _apellido: "Casta" };
    
    Promise.resolve().then(()=>{
      let input = shallow(<InputPersona persona={persona} />);
      return Promise.resolve(input)
    }).then((i)=>{
      let input = i.instance()
      expect(input._persona).toEqual(persona);
      expect(input.state.dni).toEqual(persona._dni);
      expect(input.state.nombre).toEqual(persona._nombre);
      expect(input.state.apellido).toEqual(persona._apellido);
      done();
    })
  });
  it("fetch persona from api", () => {
    let input = shallow(<InputPersona persona={{}} />);

    let data = { _dni: 122333, _nombre: "Foo", _apellido: "Roque" };
    mock.onGet("/api/personas/" + data._dni).reply(200, data);

    input
      .instance()
      .request(122333)
      .then(() => {
        expect(input.state("dni")).toEqual(data._dni);
        expect(input.state("nombre")).toEqual(data._nombre);
      });
  });
});
