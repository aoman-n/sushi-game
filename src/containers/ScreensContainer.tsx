import { connect } from 'react-redux';

import { RootStateType } from '../reducers';
import Screens, { ScreensProps } from '../components/Screens';

const mapStateToProps = (state: RootStateType): ScreensProps => ({
  layout: state.app.layout,
});

export default connect(
  mapStateToProps,
  null,
)(Screens);
