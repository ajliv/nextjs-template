import { render, screen } from '@testing-library/react';
import React from 'react';

import IndexPage from '../pages';

it('should render without crashing', () => {
    render(<IndexPage />);
    expect(screen.getByRole('main')).toBeDefined();
});
