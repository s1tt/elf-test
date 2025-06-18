import { Button } from '../../button';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Actions = ({ apply, reset, isFetching }) => {
  return (
    <ActionsContainer>
      <Button colorType="green" onClick={apply} disabled={isFetching}>
        Apply
      </Button>
      <Button colorType="red" onClick={reset} disabled={isFetching}>
        Reset
      </Button>
    </ActionsContainer>
  );
};

Actions.propTypes = {
  apply: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  isFetching: PropTypes.bool
};

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 530px) {
    flex-direction: column;
    gap: 15px;
  }
`;
