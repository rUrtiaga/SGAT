const React = require("react");
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const shallow = Enzyme.shallow;
const mount = Enzyme.mount;

Enzyme.configure({ adapter: new Adapter() });

const { selectCategorias } = require("../componentesComunes/selectMostrarcategorias.jsx");

var mock = new MockAdapter(axios);



describe("React SeleccionarCategoria", () => {
  it("Recupera 4 Categorias", () => {
    var mock = new MockAdapter(axios);

    mock.onGet('/api/categorias')
        .reply(200, [
          {
              "_id": "5b301a2b39ed8a2b082ae379",
              "_categoria": "Deportes"
          },
          {
              "_id": "5b3781846951d539842400d4",
              "_categoria": "Artes Manuales"
          },
          {
              "_id": "5b3782426951d539842400d6",
              "_categoria": "Cultura General"
          },
          {
              "_id": "5b3783016951d539842400d7",
              "_categoria": "Modas"
          }
      ]);

    var categorias
    new Promise((resolve, reject) => {
        categorias = shallow(<selectCategorias />)
        
    })
    .then((categorias) => {
        expect(categorias.state().categorias.length).toEqual(4);
        expect(alumnos.state().categorias[3]._categoria).toEqual("Cultura General");
        
    })
    .catch((error) => console.log(error))
})

    it("Recupera 0 Categorias", () => {
        var mock = new MockAdapter(axios);
    
        mock.onGet('/api/categorias')
            .reply(200, [ ]);
    
        var categorias
        new Promise((resolve, reject) => {
            categorias = shallow(<selectCategorias />)
            
        })
        .then((categorias) => {
            expect(categorias.state().categorias.length).toEqual(0);
        })
    .catch((error) => console.log(error))
})
  })