import { combineReducers } from 'redux';
import homeReducer from '../features/HomePageSlice/homeDataSlice';
import loginReducer from '../features/login/loginDataSlice';


export default combineReducers({
	/**Add more reducers here*/
	home: homeReducer,
	login: loginReducer
});
