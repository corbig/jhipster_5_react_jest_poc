import './app.scss';

import * as React from 'react';
import { connect } from 'react-redux';
import { Card } from 'reactstrap';
import { HashRouter as Router } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import { getSession } from 'app/shared/reducers/authentication';
import Header from 'app/shared/layout/header/header';
import Footer from 'app/shared/layout/footer/footer';
import { hasAnyAuthority } from 'app/shared/auth/private-route';
import { AUTHORITIES } from 'app/config/constants';
import AppRoutes from 'app/routes';

export interface IAppProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  getSession: Function;
}

export class App extends React.Component<IAppProps> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const paddingTop = '60px';
    return (
      <Router>
        <div className="app-container" style={{ paddingTop }}>
          <ToastContainer position={toast.POSITION.BOTTOM_CENTER} />
          <Header isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} />
          <div className="container-fluid view-container" id="app-view-container">
            <Card className="jh-card">
              <AppRoutes />
            </Card>
            <Footer />
          </div>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN])
});

const mapDispatchToProps = { getSession };

export default connect(mapStateToProps, mapDispatchToProps)(App);
