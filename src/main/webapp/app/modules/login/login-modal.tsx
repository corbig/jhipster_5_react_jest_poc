import * as React from 'react';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Label, Alert } from 'reactstrap';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';
import { Link } from 'react-router-dom';

export interface ILoginModalProps {
  showModal: boolean;
  loginError: boolean;
  handleLogin: Function;
  handleClose: Function;
}

class LoginModal extends React.Component<ILoginModalProps> {
  handleSubmit = (event, errors, { username, password, rememberMe }) => {
    const { handleLogin } = this.props;
    handleLogin(username, password, rememberMe);
  };

  render() {
    const { loginError, handleClose } = this.props;

    return (
      <Modal isOpen={this.props.showModal} toggle={handleClose} backdrop="static" id="login-page" autoFocus={false}>
        <AvForm onSubmit={this.handleSubmit}>
          <ModalHeader toggle={handleClose} id="login-title">
            Sign in
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-md-12">
                {loginError ? (
                  <div className="alert alert-danger">
                    <strong>Failed to sign in!</strong> Please check your credentials and try again.
                  </div>
                ) : null}
              </div>
              <div className="col-md-12">
                <AvField
                  name="username"
                  label="Username"
                  placeholder="Your username"
                  required
                  errorMessage="Username cannot be empty!"
                  autoFocus
                />
                <AvField
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Your password"
                  required
                  errorMessage="Password cannot be empty!"
                />
                <AvGroup check inline>
                  <Label className="form-check-label">
                    <AvInput type="checkbox" name="rememberMe" /> Remember me
                  </Label>
                </AvGroup>
              </div>
            </div>
            <div className="mt-1">&nbsp;</div>
            <Alert color="warning">
              <Link to="/reset/request">Did you forget your password?</Link>
            </Alert>
            <Alert color="warning">
              <span>You don't have an account yet?</span> <Link to="/register">Register a new account</Link>
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={handleClose} tabIndex="1">
              Cancel
            </Button>{' '}
            <Button color="primary" type="submit">
              Sign in
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
    );
  }
}

export default LoginModal;
