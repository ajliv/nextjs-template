import React from 'react';
import { render } from '@testing-library/react';

import Button from './Button';

it('should render without crashing', () => {
    const { getByText } = render(<Button>clickity click</Button>);
    const button = getByText('clickity click');

    expect(button).toHaveProperty('innerHTML', 'clickity click');
});
