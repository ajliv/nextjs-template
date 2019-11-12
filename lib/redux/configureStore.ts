import { createStore, applyMiddleware, AnyAction } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { createEpicMiddleware, ofType } from 'redux-observable';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

import rootReducer, { State } from './rootReducer';
import rootEpic from './rootEpic';

export const EPIC_END = '@@EPIC_END';
export const epicEnd = () => ({ type: EPIC_END });

export default (initialState?: any, epicDependencies?: Record<string, any>) => {
    const epicMiddleware = createEpicMiddleware<AnyAction, AnyAction, State>({
        dependencies: epicDependencies,
    });

    // Every time a new epic is given to rootEpic$ it
    // will unsubscribe from the previous one then
    // call and subscribe to the new one
    const rootEpic$ = new BehaviorSubject(rootEpic);

    // Wrap the root epic to unsubscribe all epics on EPIC_END actions
    const hotEpic: typeof rootEpic = (action$, ...args) =>
        rootEpic$.pipe(
            mergeMap(epic => epic(action$, ...args).pipe(takeUntil(action$.pipe(ofType(EPIC_END)))))
        );

    // create the store with Redux devtools enabled in development
    const store = createStore(
        rootReducer,
        initialState,
        composeWithDevTools(applyMiddleware(epicMiddleware))
    );

    // If HMR is enabled, setup hot reloading to replace the root epic when changes are made
    // otherwise, just run the root epic and be done with it
    if (module.hot) {
        module.hot.accept('./rootEpic', () => {
            console.log('[HMR] 🔄 Replacing root epic...');

            // kill any running epics
            store.dispatch(epicEnd());

            // and then run the new root epic
            const nextRootEpic = require('./rootEpic').default;
            rootEpic$.next(nextRootEpic);

            console.log('[HMR] ✅ Replaced root epic.');
        });

        module.hot.accept('./rootReducer', () => {
            const nextReducer = require('./rootReducer').default;
            store.replaceReducer(nextReducer);
        });
    }

    // start running the epics
    epicMiddleware.run(hotEpic);

    return store;
};
