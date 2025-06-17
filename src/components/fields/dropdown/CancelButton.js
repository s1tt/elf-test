import { ReactComponent as Cancel } from '../../../assets/arrows/cancel.svg';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useCallback } from 'react';

export const CancelButton = ({ onClick }) => {
  const handleClick = useCallback(
    (e) => {
      e.stopPropagation();
      onClick();
    },
    [onClick]
  );

  return (
    <CancelButtonContainer>
      <StyledCancelButton
        width={10}
        height={10}
        title="Clear selection"
        aria-label="Clear selection"
        onClick={handleClick}
      />
    </CancelButtonContainer>
  );
};

CancelButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

const CancelButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCancelButton = styled(Cancel)`
  fill: ${({ theme }) => theme.colors.grayLight};

  &:hover {
    fill: ${({ theme }) => theme.colors.green};
  }
`;
