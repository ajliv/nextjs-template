import { Epic } from 'redux-observable';
import { interval } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { AnyAction } from 'redux';

import { qux, QuxAction } from '../reducers/fooReducer';

/**
 * Dispatches a QUX action every second
 */
const quxEpic: Epic<AnyAction, QuxAction> = () => interval(1000).pipe(mapTo(qux()));

export default quxEpic;
