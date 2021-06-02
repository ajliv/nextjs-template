import { render, screen } from '@testing-library/react';
import React from 'react';

import { Button } from '../Button';

it('should render without crashing', () => {
    render(<Button>click click</Button>);
    expect(screen.getByRole('button')).toBeInstanceOf(HTMLButtonElement);
});
