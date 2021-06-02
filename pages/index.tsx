import styled from '@emotion/styled';
import { NextPage } from 'next';
import React from 'react';

import { Button } from '../lib/components/Button';

const Root = styled.main`
    padding: 20px;
    position: relative;
`;

const IndexPage: NextPage = () => {
    function handleClick() {
        alert('༼ つ ◕_◕ ༽つ thanks for clicking here');
    }

    return (
        <Root>
            <h1>(ง ͡ʘ ͜ʖ ͡ʘ)ง hi</h1>
            <Button onClick={handleClick}>click here</Button>
        </Root>
    );
};

export default IndexPage;
