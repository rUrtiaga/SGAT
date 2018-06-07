// listaAlumnos.test
const React = require('react');
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockAxios from 'jest-mock-axios';


Enzyme.configure({ adapter: new Adapter() });


const {ListarAlumnos} = require('../alumnos');

afterEach(() => {
    // cleaning up the mess left behind the previous test
    mockAxios.reset();
});

describe("React input Persona", () => {
   
    it("e1", () => {
        const alumnos = mount(<ListarAlumnos />)
        var response = {
            data: [{ "_alumnos": ["12","15","13"] , "_cupo":"10"}],
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {},
        }
        mockAxios.mockResponse(response);

        // expect(alumnos.state('listaDeAlumnosKey').length).toEqual(3);
        // expect(alumnos.state('listaDeAlumnosKey')).toEqual(["12", "15", "13"]); 
        // expect(alumnos.state('cupo')).toEqual(10);
    })
})