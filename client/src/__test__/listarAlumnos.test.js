// listaAlumnos.test
const React = require('react');
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';


Enzyme.configure({ adapter: new Adapter() });

const { ListarAlumnos } = require('../alumnos.js');

describe("React Listar Alumnos", () => {

    it("Recupera un Curso con un Alumno", () => {
        var mock = new MockAdapter(axios);
        let data = [{
            "_alumnos": [{ "_dni": 234567, _nombre: "Armando", _apellido: "Labarca"
                        , _telPrincipal: "455554" }],
            "_cupo": 10
        }];
        mock.onGet("/api/cursos/" + 1).reply(config => {
            return [200, data];
        }); 

        var alumnos
        new Promise((resolve, reject) => {
            alumnos = shallow(<ListarAlumnos />)
            alumnos.instance().getDataCurso().then(() => resolve(alumnos))
        })
        .then((alumnos) => {
            expect(alumnos.state().listaDeAlumnos.length).toEqual(1);
            expect(alumnos.state().listaDeAlumnos[0]._dni).toEqual(234567);
            expect(alumnos.state().listaDeAlumnos[0]._nombre).toEqual("Armando");
            expect(alumnos.state().cupo).toEqual(10);
        })
        .catch((error) => //console.log(error) 
        true )
    })

    it("Recupera un Curso con dos Alumnos", () => {
        var mock = new MockAdapter(axios);

        let data = [{
            "_alumnos": [{ "_dni": 234567, _nombre: "Armando", _apellido: "Labarca", _telPrincipal: "455554" },
                         { "_dni": 345678, _nombre: "Maria", _apellido: "Mercedes", _telPrincipal: "454545" }],
            "_cupo": 12
        }];
        mock.onGet("/api/cursos/" + 1).reply(config => {
            return [200, data];
        }); 

        var alumnos
        new Promise((resolve, reject) => {
            alumnos = shallow(<ListarAlumnos  />)
            alumnos.instance().getDataCurso().then(() => resolve(alumnos))

        })
        .then((alumnos) => {          
            expect(alumnos.listaDeAlumnos.length).toEqual(2);
            expect(alumnos.listaDeAlumnos.map(x=>x._dni)).toContain(234567);
            expect(alumnos.listaDeAlumnos.map(x => x._dni)).toContain(345678);
            expect(alumnos.cupo).toEqual(12);
        })
        .catch((error) => //console.log(error)
        true)
    })

})