import * as React from 'react';
import { connect } from 'react-redux';

import { Table, Badge } from 'reactstrap';
import { FaEye, FaRefresh } from 'react-icons/lib/fa';

import { systemHealth } from '../administration.reducer';
import HealthModal from './health-modal';

export interface IHealthPageProps {
  isFetching?: boolean;
  systemHealth: Function;
  health: any;
  systemHealthInfo: any;
}

export interface IHealthPageState {
  healthObject: any;
  showModal: boolean;
}

export class HealthPage extends React.Component<IHealthPageProps, IHealthPageState> {
  state: IHealthPageState = {
    healthObject: {},
    showModal: false
  };

  componentDidMount() {
    this.props.systemHealth();
  }

  getSystemHealth = () => {
    if (!this.props.isFetching) {
      this.props.systemHealth();
    }
  };

  getSystemHealthInfo = (name, healthObject) => () => {
    this.setState({
      showModal: true,
      healthObject: {
        ...healthObject,
        name
      }
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false
    });
  };

  renderModal = () => {
    const { healthObject } = this.state;
    return <HealthModal healthObject={healthObject} handleClose={this.handleClose} showModal={this.state.showModal} />;
  };

  render() {
    const { health, isFetching } = this.props;
    const data = (health || {}).details || {};
    return (
      <div>
        <h2>Health Checks</h2>
        <p>
          <button
            type="button"
            onClick={this.getSystemHealth}
            className={isFetching ? 'btn btn-danger' : 'btn btn-primary'}
            disabled={isFetching}
          >
            <FaRefresh />&nbsp; Refresh
          </button>
        </p>
        <div className="row">
          <div className="col-12">
            <Table bordered>
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>Status</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(data).map(
                  (configPropKey, configPropIndex) =>
                    configPropKey !== 'status' ? (
                      <tr key={configPropIndex}>
                        <td>{configPropKey}</td>
                        <td>
                          <Badge color={data[configPropKey].status !== 'UP' ? 'danger' : 'success'}>{data[configPropKey].status}</Badge>
                        </td>
                        <td>
                          {data[configPropKey].details ? (
                            <a onClick={this.getSystemHealthInfo(configPropKey, data[configPropKey])}>
                              <FaEye />
                            </a>
                          ) : null}
                        </td>
                      </tr>
                    ) : null
                )}
              </tbody>
            </Table>
          </div>
        </div>
        {this.renderModal()}
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  health: storeState.administration.health,
  isFetching: storeState.administration.isFetching
});

const mapDispatchToProps = { systemHealth };

export default connect(mapStateToProps, mapDispatchToProps)(HealthPage);