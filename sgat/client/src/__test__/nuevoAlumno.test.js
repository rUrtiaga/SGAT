const React = require('react');
const Enzyme =  require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const mockAxios = require('jest-mock-axios');
const shallow = Enzyme.shallow
const mount = Enzyme.mount

Enzyme.configure({ adapter: new Adapter() });

// const {InputPersona} = require('../nuevoAlumno');


describe("React input Persona", () => {
    // const inputPersona = shallow(<InputPersona/>)
    it("e1", () => {
        
    })
})
