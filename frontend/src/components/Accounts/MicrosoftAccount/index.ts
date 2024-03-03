import { RootState } from '../../../state/types.ts';
import { connect } from 'react-redux';
import { MicrosoftAccountComponent } from './MicrosoftAccount.tsx';

function mapStateToProps(state: RootState) {
	return { userId: state.config?.msgraph?.userId };
}

export default connect(mapStateToProps)(MicrosoftAccountComponent);
