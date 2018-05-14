import * as React from 'react';
import { Button, Col, Alert, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { AvForm, AvField } from 'availity-reactstrap-validation';

import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';

const successAlert = (
  <Alert color="success">
    <strong>Settings saved!</strong>
  </Alert>
);

export interface IUserSettingsProps {
  account: any;
  getSession: Function;
  saveAccountSettings: Function;
  reset: Function;
  updateSuccess: boolean;
}

export interface IUserSettingsState {
  account: any;
}

export class SettingsPage extends React.Component<IUserSettingsProps, IUserSettingsState> {
  state: IUserSettingsState = {
    account: this.props.account
  };

  componentDidMount() {
    this.props.getSession();
  }

  componentWillUnmount() {
    this.props.reset();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      account: nextProps.account
    });
  }

  handleValidSubmit = (event, values) => {
    const account = {
      ...this.state.account,
      ...values
    };

    this.props.saveAccountSettings(account);
    event.persist();
  };

  render() {
    const { account } = this.state;
    const { updateSuccess } = this.props;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2>User settings for {account.login}</h2>
            {updateSuccess ? successAlert : null}
            <AvForm onValidSubmit={this.handleValidSubmit}>
              {/* First name */}
              <AvField
                className="form-control"
                name="firstName"
                label="First Name"
                id="firstName"
                placeholder="Your first name"
                validate={{
                  required: { value: true, errorMessage: 'Your first name is required.' },
                  minLength: { value: 1, errorMessage: 'Your first name is required to be at least 1 character' },
                  maxLength: { value: 50, errorMessage: 'Your first name cannot be longer than 50 characters' }
                }}
                value={account.firstName}
              />
              {/* Last name */}
              <AvField
                className="form-control"
                name="lastName"
                label="Last Name"
                id="lastName"
                placeholder="Your last name"
                validate={{
                  required: { value: true, errorMessage: 'Your last name is required.' },
                  minLength: { value: 1, errorMessage: 'Your last name is required to be at least 1 character' },
                  maxLength: { value: 50, errorMessage: 'Your last name cannot be longer than 50 characters' }
                }}
                value={account.lastName}
              />
              {/* Email */}
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
                value={account.email}
              />
              <Button color="primary" type="submit">
                Save
              </Button>
            </AvForm>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication, settings }) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  updateSuccess: settings.updateSuccess,
  updateFailure: settings.updateFailure
});

const mapDispatchToProps = { getSession, saveAccountSettings, reset };

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);
