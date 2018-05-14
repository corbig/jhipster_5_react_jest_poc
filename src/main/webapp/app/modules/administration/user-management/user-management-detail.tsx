import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FaArrowLeft } from 'react-icons/lib/fa';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { IUser } from 'app/shared/model/user.model';
import { getUser } from './user-management.reducer';

export interface IUserManagementDetailProps {
  getUser: ICrudGetAction<IUser>;
  user: IUser;
  match: any;
}

export class UserManagementDetail extends React.Component<IUserManagementDetailProps> {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <h2>
          User [<b>{user.login}</b>]
        </h2>
        <dl className="row-md jh-entity-details">
          <dt>Login</dt>
          <dd>
            <span>{user.login}</span>&nbsp;
            {user.activated ? (
              <span className="badge badge-success">Activated</span>
            ) : (
              <span className="badge badge-danger">Deactivated</span>
            )}
          </dd>
          <dt>First Name</dt>
          <dd>{user.firstName}</dd>
          <dt>Last Name</dt>
          <dd>{user.lastName}</dd>
          <dt>Email</dt>
          <dd>{user.email}</dd>
          <dt>Created By</dt>
          <dd>{user.createdBy}</dd>
          <dt>Created Date</dt>
          <dd>
            <TextFormat value={user.createdDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
          </dd>
          <dt>Last Modified By</dt>
          <dd>{user.lastModifiedBy}</dd>
          <dt>Last Modified Date</dt>
          <dd>
            <TextFormat value={user.lastModifiedDate} type="date" format={APP_DATE_FORMAT} blankOnInvalid />
          </dd>
          <dt>Profiles</dt>
          <dd>
            <ul className="list-unstyled">
              {user.authorities
                ? user.authorities.map((authority, i) => (
                    <li key={`user-auth-${i}`}>
                      <span className="badge badge-info">{authority}</span>
                    </li>
                  ))
                : null}
            </ul>
          </dd>
        </dl>
        <Button tag={Link} to="/admin/user-management" replace color="info">
          <FaArrowLeft /> <span className="d-none d-md-inline">Back</span>
        </Button>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  user: storeState.userManagement.user
});

const mapDispatchToProps = { getUser };

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementDetail);
