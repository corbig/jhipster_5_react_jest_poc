import * as React from 'react';

import { connect } from 'react-redux';
import { AvForm, AvField } from 'availity-reactstrap-validation';
import { Button, Alert } from 'reactstrap';

import { handlePasswordResetInit, reset } from '../password-reset.reducer';

export interface IPasswordResetInitProps {
  handlePasswordResetInit: Function;
  reset: Function;
  resetPasswordSuccess: boolean;
  resetPasswordFailure: boolean;
}

export class PasswordResetInit extends React.Component<IPasswordResetInitProps> {
  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.handlePasswordResetInit(values.email);
    event.preventDefault();
  };

  render() {
    const { resetPasswordSuccess, resetPasswordFailure } = this.props;
    let alertMessage = null;

    if (resetPasswordFailure) {
      alertMessage = (
        <Alert color="danger">
          <strong>Email address isn't registered!</strong> Please check and try again
        </Alert>
      );
    } else {
      if (resetPasswordSuccess) {
        alertMessage = <Alert color="success">Check your emails for details on how to reset your password.</Alert>;
      } else {
        alertMessage = null;
      }
    }

    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h1>Reset your password</h1>
            <Alert color="warning">
              <p>Enter the email address you used to register</p>
            </Alert>
            {alertMessage}
            <AvForm onValidSubmit={this.handleValidSubmit}>
              <AvField
                name="email"
                label="Email"
                placeholder="Your email"
                type="email"
                validate={{
                  required: { value: true, errorMessage: 'Your email is required.' },
                  minLength: { value: 5, errorMessage: 'Your email is required to be at least 5 characters.' },
                  maxLength: { value: 254, errorMessage: 'Your email cannot be longer than 50 characters.' }
                }}
              />
              <Button color="primary" type="submit">
                Reset password
              </Button>
            </AvForm>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ passwordReset }) => ({
  resetPasswordSuccess: passwordReset.resetPasswordSuccess,
  resetPasswordFailure: passwordReset.resetPasswordFailure
});

const mapDispatchToProps = { handlePasswordResetInit, reset };

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetInit);
