import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, Alert } from 'reactstrap';

import { activateAction, reset } from './activate.reducer';

const successAlert = (
  <Alert color="success">
    <strong>Your user account has been activated.</strong> Please
    <Link to="/login" className="alert-link">
      sign in
    </Link>.
  </Alert>
);

const failureAlert = (
  <Alert color="danger">
    <strong>Your user could not be activated.</strong> Please use the registration form to sign up.
  </Alert>
);

export interface IActivateProps {
  activateAction: Function;
  reset: Function;
  activationSuccess: boolean;
  activationFailure: boolean;
  match: any;
}

export class ActivatePage extends React.Component<IActivateProps> {
  componentWillUnmount() {
    this.props.reset();
  }

  componentDidMount() {
    const { key } = this.props.match.params;
    this.props.activateAction(key);
  }

  render() {
    const { activationSuccess, activationFailure } = this.props;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h1>Activation</h1>
            {activationSuccess ? successAlert : undefined}
            {activationFailure ? failureAlert : undefined}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ activate }) => ({
  activationSuccess: activate.activationSuccess,
  activationFailure: activate.activationFailure
});

const mapDispatchToProps = { activateAction, reset };

export default connect(mapStateToProps, mapDispatchToProps)(ActivatePage);
