import React, { HTMLProps } from 'react';
import styled from 'styled-components';

import Logo from '../../images/logo.svg';
import Button from '../../components/Button/Button';

export interface Props {
    count: number;
    setCount(count: number): void;
}

//
// ─── STYLED COMPONENTS ──────────────────────────────────────────────────────────
//

const Root = styled.div`
    position: relative;
    padding: 3em;

    * {
        box-sizing: inherit;
    }

    ${Button} {
        margin: 0;
    }
`;

const Header = styled.header`
    align-items: center;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1em;
    margin: 0 0 2em;

    h1 {
        font-size: 1.5em;
        font-weight: 700;
        line-height: 1;
    }
`;

//
// ─── COMPONENT ──────────────────────────────────────────────────────────────────
//

const Hello: React.FC<Props & HTMLProps<HTMLDivElement>> = ({ count, setCount }) => {
    function resetCount() {
        setCount(0);
    }

    return (
        <Root>
            <Header>
                <Logo width="48px" />
                <h1>Hello: {count}</h1>
            </Header>
            <Button onClick={resetCount}>Clickity click</Button>
        </Root>
    );
};

export default Hello;
