import { connect } from 'react-redux';
import { RootState } from '../../state/types.ts';
import AccountPage from './AccountPage.tsx';

function msGraphMapStateToProps(state: RootState) {
	return {
		userId: state.config?.msgraph?.userId,
	};
}

function googleMapStateToProps(state: RootState) {
	return {
		userId: state.config?.gcal?.userId,
	};

}

export const MicrosoftAccountPage = connect(msGraphMapStateToProps)(AccountPage);
export const GoogleAccountPage = connect(googleMapStateToProps)(AccountPage);
