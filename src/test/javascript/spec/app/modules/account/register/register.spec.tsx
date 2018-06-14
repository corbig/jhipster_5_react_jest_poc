/* import * as React from 'react';
import { shallow } from 'enzyme';
import axios from 'axios';
import * as configureStore from 'redux-mock-store';
import { spy, sandbox } from 'sinon';

import { RegisterPage } from 'app/modules/account/register/register';

describe.only('RegisterComponent', () => {
  describe('RegisterPage', () => {
    let mountedWrapper;
    let localSandbox;
    const mockStore = configureStore();
    const handleRegisterSpy = spy();

    const wrapper = () => {
      localSandbox = sandbox.create();
      const initialState = {};
      // const store = mockStore(initialState);
      const props = {
        handleRegister: handleRegisterSpy,
        reset: spy(),
        registrationSuccess: false,
        registrationFailure: false,
        errorMessage: '',
        currentLocale: 'en'
      };

      if (!mountedWrapper) {
        mountedWrapper = shallow(
          <RegisterPage {...props}/>
        );
      }

      return mountedWrapper;
    };

    const defaultInput = {
      username: 'testUsername',
      email: 'test@email.com',
      firstPassword: 'pa$$word',
      secondPassword: 'pa$$word'
    };

    const fillForm = (wrappedRegister, values = defaultInput) => {
      wrappedRegister.find({ name: 'username' }).simulate('change', { target: { value: values.username } });
      wrappedRegister.find({ name: 'email' }).simulate('change', { target: { value: values.email } });
      wrappedRegister.find({ name: 'firstPassword' }).simulate('change', { target: { value: values.firstPassword } });
      wrappedRegister.find({ name: 'secondPassword' }).simulate('change', { target: { value: values.secondPassword } });
    };

    beforeEach(() => {
      mountedWrapper = undefined;
    });

    it('should ensure the two passwords entered match', async () => {
      const register = wrapper();
      const values = {
        ...defaultInput,
        secondPassword: 'otherpassword'
      };

      fillForm(register, values);
      register.find('#register-submit').simulate('click');

      // Both should be false since you can't submit an invalid form.
      expect(handleRegisterSpy.called).toEquals(false);
    });

    it('should update registration success to true after creating an account', async () => {
      const register = wrapper();
      fillForm(register);
      const resolved = new Promise(r => r({ status: 201 }));
      localSandbox.stub(axios, 'get').returns(resolved);

      register.find('#register-submit').simulate('click');

      expect(handleRegisterSpy.called).toEquals(true);
      // expect(register.props().registrationSuccess).toEqual(true);
      // expect(register.props().registrationFailure).toEqual(false);
    });

    it('should notify of user existence upon 400/login already in use', () => {
      const register = wrapper();
      fillForm(register);
      const resolved = new Promise(r => r({ status: 400, data: {
          'entityName' : 'userManagement',
          'errorKey' : 'userexists',
          'type' : 'https://www.jhipster.tech/problem/login-already-used',
          'title' : 'Login already in use',
          'status' : 400,
          'message' : 'error.userexists',
          'params' : 'userManagement'
        }
      }));
      localSandbox.stub(axios, 'get').returns(resolved);

      register.dive().find('#register-submit').simulate('click');

      expect(register.props().registrationSuccess).be.toEquals(false);
      expect(register.props().registrationFailure).be.toEquals(true);
      expect(register.props().errorMessage).be.toEquals('userexists');
    });

    it('should notify of email existence upon 400/email address already in use', () => {
      const register = wrapper();
      fillForm(register);
      const resolved = new Promise(r => r({ status: 400, data: {
          'entityName' : 'userManagement',
          'errorKey' : 'emailexists',
          'type' : 'https://www.jhipster.tech/problem/email-already-used',
          'title' : 'Email address already in use',
          'status' : 400,
          'message' : 'error.emailexists',
          'params' : 'userManagement'
        }
      }));
      localSandbox.stub(axios, 'get').returns(resolved);

      register.dive().find('#register-submit').simulate('click');

      expect(register.props().registrationSuccess).be.toEquals(false);
      expect(register.props().registrationFailure).be.toEquals(true);
      expect(register.props().errorMessage).be.toEquals('emailexists');
    });

    it('should notify of generic error', () => {
      // Add a sandbox to simulate a generic error.
      const register = wrapper();
      fillForm(register);
      const resolved = new Promise(r => r({ status: 503 }));
      sandbox.stub(axios, 'get').returns(resolved);

      register.dive().find('#register-submit').simulate('click');

      expect(register.props().registrationSuccess).be.toEquals(false);
      expect(register.props().registrationFailure).be.toEquals(true);
      expect(register.props().errorMessage).be.toEquals(undefined);
    });

  });
});
 */
