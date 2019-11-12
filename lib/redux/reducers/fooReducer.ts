import { Action, Reducer, combineReducers } from 'redux';

//
// ─── TYPINGS ────────────────────────────────────────────────────────────────────
//

export interface FooState {
    bar: number;
}

//
// ─── ACTION TYPES ───────────────────────────────────────────────────────────────
//

export const BAZ = 'FOO__BAZ';
export const QUX = 'FOO__QUX';

//
// ─── ACTIONS ────────────────────────────────────────────────────────────────────
//

export interface BazAction extends Action<typeof BAZ> {
    payload: number;
}

export type QuxAction = Action<typeof QUX>;

//
// ─── ACTION CREATORS ────────────────────────────────────────────────────────────
//

export const baz = (payload: number): BazAction => ({
    type: BAZ,
    payload,
});

export const qux = (): QuxAction => ({ type: QUX });

//
// ─── REDUCERS ───────────────────────────────────────────────────────────────────
//

type FooReducer<K extends keyof FooState> = Reducer<FooState[K], BazAction | QuxAction>;

export const barReducer: FooReducer<'bar'> = (state = 0, action) => {
    switch (action.type) {
        case BAZ:
            return typeof action.payload === 'number' ? action.payload : state;
        case QUX:
            return state + 1;
        default:
            return state;
    }
};

export default combineReducers<FooState>({
    bar: barReducer,
});
