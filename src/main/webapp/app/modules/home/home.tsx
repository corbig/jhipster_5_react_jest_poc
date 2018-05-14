import './home.scss';

import * as React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { getSession } from 'app/shared/reducers/authentication';

export interface IHomeProp {
  account: any;
  getSession: Function;
}

export interface IHomeState {
  currentUser: any;
}

export class Home extends React.Component<IHomeProp, IHomeState> {
  state: IHomeState = {
    currentUser: this.props.account
  };

  componentWillMount() {
    this.props.getSession();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      currentUser: nextProps.account
    });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="row">
        <div className="col-md-9">
          <h2>Welcome, Java Hipster!</h2>
          <p className="lead">This is your homepage</p>
          {currentUser && currentUser.login ? (
            <div>
              <div className="alert alert-success">You are logged in as user {currentUser.login}.</div>
            </div>
          ) : (
            <div>
              <div className="alert alert-warning">
                If you want to
                <Link to="/login" className="alert-link">
                  sign in
                </Link>
                , you can try the default accounts:
                <br />- Administrator (login=&quot;admin&quot; and password=&quot;admin&quot;)
                <br />- User (login=&quot;user&quot; and password=&quot;user&quot;).
              </div>

              <div className="alert alert-warning">
                You do not have an account yet?&nbsp;
                <Link to="/register" className="alert-link">
                  Register a new account
                </Link>
              </div>
            </div>
          )}
          <p>If you have any question on JHipster:</p>

          <ul>
            <li>
              <a href="http://jhipster.github.io/" target="_blank" rel="noopener noreferrer">
                JHipster homepage
              </a>
            </li>
            <li>
              <a href="http://stackoverflow.com/tags/jhipster/info" target="_blank" rel="noopener noreferrer">
                JHipster on Stack Overflow
              </a>
            </li>
            <li>
              <a href="https://github.com/jhipster/generator-jhipster/issues?state=open" target="_blank" rel="noopener noreferrer">
                JHipster bug tracker
              </a>
            </li>
            <li>
              <a href="https://gitter.im/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
                JHipster public chat room
              </a>
            </li>
            <li>
              <a href="https://twitter.com/java_hipster" target="_blank" rel="noopener noreferrer">
                follow @java_hipster on Twitter
              </a>
            </li>
          </ul>

          <p>
            If you like JHipster, do not forget to give us a star on{' '}
            <a href="https://github.com/jhipster/generator-jhipster" target="_blank" rel="noopener noreferrer">
              Github
            </a>!
          </p>
        </div>
        <div className="col-md-3 pad">
          <span className="hipster rounded" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
