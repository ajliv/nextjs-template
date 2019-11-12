import styled from 'styled-components';

const Button = styled.button`
    background: black;
    border: 0;
    color: white;
    padding: 0.5em;
    position: relative;

    :active {
        transform: translateY(1px);
    }
`;

export default Button;
