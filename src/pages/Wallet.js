import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import { actionFetchCurrencies } from '../redux/actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCurrencies());
  }

  render() {
    const { isFetching } = this.props;
    return (
      <div className="wallet-page">
        <Header />
        {isFetching ? 'Loading...' : <WalletForm /> }
        <Table />
      </div>
    );
  }
}
Wallet.propTypes = {
  isFetching: PropTypes.bool,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  isFetching: wallet.isFetching,
});
export default connect(mapStateToProps)(Wallet);
