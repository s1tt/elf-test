import { ReactComponent as Down } from '../../../assets/arrows/down.svg';
import PropTypes from 'prop-types';
import { ReactComponent as Up } from '../../../assets/arrows/up.svg';
import styled from 'styled-components';

export const Arrow = ({ isOpen = false }) => {
  return (
    <ArrowContainer>
      {isOpen ? (
        <StyledUpArrow width={10} height={10} title="Up Arrow" />
      ) : (
        <StyledDownArrow width={10} height={10} title="Down Arrow" />
      )}
    </ArrowContainer>
  );
};

Arrow.propTypes = {
  isOpen: PropTypes.bool
};

const ArrowContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledUpArrow = styled(Up)`
  fill: ${({ theme }) => theme.colors.graySuperLight};
`;

const StyledDownArrow = styled(Down)`
  fill: ${({ theme }) => theme.colors.gray};
`;
