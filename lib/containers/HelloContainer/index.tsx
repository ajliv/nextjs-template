import { connect, MapStateToProps, MapDispatchToProps } from 'react-redux';

import { baz } from '../../redux/reducers/fooReducer';
import { State } from '../../redux/rootReducer';

import Hello, { Props } from './Hello';

type StateProps = Pick<Props, 'count'>;
type DispatchProps = Pick<Props, 'setCount'>;
type OwnProps = Omit<Props, keyof StateProps | keyof DispatchProps>;

const mapStateToProps: MapStateToProps<StateProps, OwnProps, State> = state => ({
    count: state.foo.bar,
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = {
    setCount: baz,
};

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
