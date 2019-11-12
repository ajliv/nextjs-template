import { combineReducers } from 'redux';

import fooReducer, { FooState } from './reducers/fooReducer';

//
// ─── TYPINGS ────────────────────────────────────────────────────────────────────
//

export interface State {
    foo: FooState;
}

//
// ─── REDUCERS ───────────────────────────────────────────────────────────────────
//

export default combineReducers<State>({
    foo: fooReducer,
});
