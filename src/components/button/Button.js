import styled, { css } from 'styled-components';

import PropTypes from 'prop-types';

export const Button = ({
  children,
  colorType = 'green',
  ...forwardingProps
}) => {
  return (
    <ButtonContainer>
      <StyledButton type="button" colorType={colorType} {...forwardingProps}>
        {children}
      </StyledButton>
    </ButtonContainer>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  colorType: PropTypes.oneOf(['green', 'red'])
};

const ButtonContainer = styled.div``;

const StyledButton = styled.button`
  background-color: transparent;
  border: 1px solid;
  font-size: ${({ theme }) => theme.fontSize.small};
  cursor: pointer;
  padding: 10px 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
  width: 100%;

  ${({ colorType, theme }) =>
    colorType === 'green' &&
    css`
      color: ${theme.colors.green};
      border-color: ${theme.colors.green};

      &:hover {
        color: ${theme.colors.white};
        background-color: ${theme.colors.green};
      }
    `}

  ${({ colorType, theme }) =>
    colorType === 'red' &&
    css`
      color: ${theme.colors.red};
      border-color: ${theme.colors.red};

      &:hover {
        color: ${theme.colors.white};
        background-color: ${theme.colors.red};
      }
    `}

		  @media (max-width: 950px) {
    padding: 10px 14px;
  }
`;
