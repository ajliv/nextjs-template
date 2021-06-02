import React, { forwardRef } from 'react';

export const ReactComponent = forwardRef((props, ref) => <span ref={ref} {...props} />);
ReactComponent.displayName = 'SvgrMock';

export default 'SvgrURL';
