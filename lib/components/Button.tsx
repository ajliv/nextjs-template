import styled from '@emotion/styled';

export const Button = styled.button`
    appearance: none;
    background: black;
    border: 0;
    color: white;
    cursor: pointer;
    line-height: 1;
    padding: 6px 10px;

    @media (hover: hover) {
        &:hover {
            background: red;
        }
    }
`;
