// listaAlumnos.test
const React = require('react');
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


Enzyme.configure({ adapter: new Adapter() });

const { ListarAlumnos } = require('../alumnos_test.js');

describe("React Listar Alumnos", () => {

    it("Recupera un Curso con un Alumno", () => {
        var mock = new MockAdapter(axios);

        mock.onGet('/api/talleres/Ceramica/subcategorias/Normal/cursos')
            .reply(200, [{ "_alumnos": [{ "_dni": 222, _nombre: "Federico", _apellido: "Arambarri", _telPrincipal: "555" }],
                         "_cupo": 10 }]);

        var alumnos
        new Promise((resolve, reject) => {
            alumnos = shallow(<ListarAlumnos />)
            alumnos.instance().getDataCurso().then(() => resolve(alumnos))
        })
        .then((alumnos) => {
            expect(alumnos.state().listaDeAlumnos.length).toEqual(1);
            expect(alumnos.state().listaDeAlumnos[0]._dni).toEqual(222);
            expect(alumnos.state().listaDeAlumnos[0]._nombre).toEqual("Federico");
            expect(alumnos.state().cupo).toEqual(10);
        })
        .catch((error) => console.log(error))
    })

    it("Recupera un Curso con dos Alumnos", () => {
        var mock = new MockAdapter(axios);

        mock.onGet('/api/talleres/Ceramica/subcategorias/Normal/cursos')
            .reply(200, [{
                "_alumnos": [{ "_dni": 222, _nombre: "Federico", _apellido: "Arari", _telPrincipal: "444" }, 
                             { "_dni": 223, _nombre: "Fede", _apellido: "Arambarri", _telPrincipal: "555" }],

                "_cupo": 10
            }]);

        var alumnos
        new Promise((resolve, reject) => {
            alumnos = shallow(<ListarAlumnos />)
            alumnos.instance().getDataCurso().then(() => resolve(alumnos))

        })
        .then((alumnos) => {
            expect(alumnos.state().listaDeAlumnos.length).toEqual(2);
            expect(alumnos.state().listaDeAlumnos.map(x=>x._dni)).toContain(222);
            expect(alumnos.state().listaDeAlumnos.map(x => x._dni)).toContain(223);
            expect(alumnos.state().cupo).toEqual(10);
        })
        .catch((error) => console.log(error))
    })

})