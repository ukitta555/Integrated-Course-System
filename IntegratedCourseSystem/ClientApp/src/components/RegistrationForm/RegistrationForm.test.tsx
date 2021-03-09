import * as React from "react"
import TextField from '@material-ui/core/TextField';
import RegistrationForm from "./RegistrationForm"
import * as enzyme from "enzyme"
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
(enzyme as any).configure({ adapter: new Adapter() });

describe('<RegistrationForm/> rendering', () => {
  let wrapper: any, mockStore, initialState, store;
  beforeEach(() => {
    mockStore = configureStore();
    initialState = {}
    store = mockStore(initialState);
    wrapper = enzyme.mount(<Provider store={store}><RegistrationForm/></Provider>);
  })
  it("renders 3 textfields", () => {
    expect(wrapper.find(TextField)).toHaveLength(3);
  });
});

describe("RegistrationForm interaction", () => {
  let wrapper: any, mockStore, initialState, store, mockSubmit;
  beforeEach(() => {
    mockSubmit = jest.fn();
    mockStore = configureStore();
    initialState = {}
    store = mockStore(initialState);
    wrapper = enzyme.mount(<Provider store={store}><RegistrationForm/></Provider>);
  });
  
  it("Shows passwords don't match error message", () => {

    expect(wrapper.findWhere((n: any) => n.text() === 'Passwords don\'t match!')).toHaveLength(0);
    
    const textFields = wrapper.find(TextField);
    const emailInput = textFields.at(0).find('input');
    emailInput.simulate('change', {target: {value: 'a@knu.ua'}});
    const pwdInput = textFields.at(1).find('input');
    pwdInput.simulate('change', {target: {value: '1'}});
    const pwdRepeatInput = textFields.at(2).find('input');
    pwdRepeatInput.simulate('change', {target: {value: '2'}});
    
    wrapper.find('form').simulate('submit');
    expect(wrapper.findWhere((n: any) => n.text() === 'Passwords don\'t match!'));
  });
});