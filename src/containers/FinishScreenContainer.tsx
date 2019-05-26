import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { startGame } from '../actions/app';
// import { RootStateType } from '../reducers';
import FinishScreen from '../components/FinishScreen';

interface DispatchProps {
  startGame: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators({ startGame }, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(FinishScreen);
