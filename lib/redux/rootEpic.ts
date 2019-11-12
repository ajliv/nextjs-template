import { combineEpics } from 'redux-observable';
import { AnyAction } from 'redux';

import quxEpic from './epics/quxEpic';
import { State } from './rootReducer';

export default combineEpics<AnyAction, AnyAction, State, any>(quxEpic);
