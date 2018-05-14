import * as React from 'react';
import { connect } from 'react-redux';
import { Alert, Col, Row, Button } from 'reactstrap';
import { AvForm, AvField } from 'availity-reactstrap-validation';

import { Link } from 'react-router-dom';

import { handlePasswordResetFinish, reset } from '../password-reset.reducer';
import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';

const actionRequiredAlert = <Alert color="warning">Choose a new password</Alert>;

const successAlert = (
  <Alert color="success">
    <strong>Your password has been reset.</strong> Please{' '}
    <Link className="alert-link" to="/login">
      sign in
    </Link>.
  </Alert>
);

const errorAlert = <Alert color="danger">Your password couldn't be reset. Remember a password request is only valid for 24 hours.</Alert>;

const missingArgAlert = <Alert color="danger">The reset key is missing.</Alert>;

export interface IPasswordResetFinishProps {
  resetPasswordSuccess: boolean;
  resetPasswordFailure: boolean;
  handlePasswordResetFinish: Function;
  reset: Function;
  match: any;
}

export interface IPasswordResetFinishState {
  password: string;
  key: string;
}

export class PasswordResetFinishPage extends React.Component<IPasswordResetFinishProps, IPasswordResetFinishState> {
  state: IPasswordResetFinishState = {
    password: '',
    key: this.props.match.params.key
  };

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    this.props.handlePasswordResetFinish(this.state.key, values.newPassword);
  };

  updatePassword = event => {
    this.setState({ password: event.target.value });
  };

  getResetForm() {
    return (
      <AvForm onValidSubmit={this.handleValidSubmit}>
        <AvField
          name="newPassword"
          label="New password"
          placeholder={'New password'}
          type="password"
          validate={{
            required: { value: true, errorMessage: 'Your password is required.' },
            minLength: { value: 4, errorMessage: 'Your password is required to be at least 4 characters.' },
            maxLength: { value: 50, errorMessage: 'Your password cannot be longer than 50 characters.' }
          }}
          onChange={this.updatePassword}
        />
        <PasswordStrengthBar password={this.state.password} />
        <AvField
          name="confirmPassword"
          label="New password confirmation"
          placeholder="Confirm the new password"
          type="password"
          validate={{
            required: { value: true, errorMessage: 'Your confirmation password is required.' },
            minLength: { value: 4, errorMessage: 'Your confirmation password is required to be at least 4 characters.' },
            maxLength: { value: 50, errorMessage: 'Your confirmation password cannot be longer than 50 characters.' },
            match: { value: 'newPassword', errorMessage: 'The password and its confirmation do not match!' }
          }}
        />
        <Button color="success" type="submit">
          Validate new password
        </Button>
      </AvForm>
    );
  }

  render() {
    const { key } = this.state;
    const { resetPasswordSuccess, resetPasswordFailure } = this.props;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="4">
            <h1>Reset password</h1>
            {key ? actionRequiredAlert : null}
            {!resetPasswordSuccess && !resetPasswordFailure && !key ? missingArgAlert : null}
            {resetPasswordSuccess ? successAlert : null}
            {resetPasswordFailure ? errorAlert : null}
            <div>{key ? this.getResetForm() : null}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ passwordReset }) => ({
  resetPasswordSuccess: passwordReset.resetPasswordSuccess,
  resetPasswordFailure: passwordReset.resetPasswordFailure
});

const mapDispatchToProps = { handlePasswordResetFinish, reset };

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetFinishPage);
