import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { startGame } from '../actions/app';
import { RootStateType } from '../reducers';
import FinishScreen from '../components/FinishScreen';

interface StateProps {
  level: number;
  killCount: number;
}

interface DispatchProps {
  startGame: () => void;
}

const mapStateToProps = (state: RootStateType) => ({
  level: state.app.level,
  killCount: state.app.killCount,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps =>
  bindActionCreators({ startGame }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FinishScreen);
