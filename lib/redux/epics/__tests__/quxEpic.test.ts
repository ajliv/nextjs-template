import { TestScheduler } from 'rxjs/testing';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { AnyAction } from 'redux';

import rootReducer from '../../rootReducer';
import quxEpic from '../quxEpic';
import { qux } from '../../reducers/fooReducer';

let scheduler: TestScheduler;

beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
        expect(actual).toEqual(expected);
    });
});

it('should dispatch a QUX action every second', () => {
    scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = new ActionsObservable(cold<AnyAction>(''));
        const state$ = new StateObservable(hot(''), rootReducer(undefined, { type: '@@INIT' }));

        const epic = quxEpic(action$, state$, {});

        expectObservable(epic, '3s !').toBe('1s a 999ms a', { a: qux() });

        scheduler.flush();
    });
});
