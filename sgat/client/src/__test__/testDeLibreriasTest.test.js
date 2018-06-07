const React = require("react");
const Enzyme = require("enzyme");
const Adapter = require("enzyme-adapter-react-16");
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
const shallow = Enzyme.shallow;
const mount = Enzyme.mount;

Enzyme.configure({ adapter: new Adapter() });

// const {InputPersona} = require('../componentesComunes/inputPersona.jsx');

class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      s: "holas"
    };
  }

  componentDidMount() {
    this.request();
  }

  request() {
    return axios
      .get("/test")
      .then(response => {
        this.setState({ s:  response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return <p>Hola</p>;
  }
}

describe("Test mock", () => {
  const test = shallow(<Test />);
  it("test holas", () => {
    expect(test.state("s")).toEqual("holas");
  });
  it("axios", done => {
    let mock = new MockAdapter(axios);
    let text = "server says hello!";
    mock.onGet("/test").reply(200, text);

    test
      .instance()
      .request()
      .then(() => {
        expect(test.state("s")).toEqual(text);
        done();
      })
      .catch(e => console.log(e));
  });
});
