import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { startGame } from '../actions/app';
// import { RootStateType } from '../reducers';
import TitleScreen from '../components/TitleScreen';

interface DispatchProps {
  startGame: () => void;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators({ startGame }, dispatch);

export default connect(
  null,
  mapDispatchToProps,
)(TitleScreen);
