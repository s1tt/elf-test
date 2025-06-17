import { CardStatus } from './CardStatus';
import { CardTitle } from './CardTitle';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useCallback } from 'react';

export function Card({ onClickHandler, ...props }) {
  const { status, name, species, type, gender, image } = props;

  const handleClick = useCallback(() => {
    if (onClickHandler) {
      onClickHandler(props);
    }
  }, [onClickHandler, props]);

  return (
    <StyledCard onClick={handleClick}>
      <CardImg src={image} alt={name} />
      <CardInfo>
        <CardTitle name={name} gender={gender} />
        <CardStatus status={status} species={species} type={type} />
      </CardInfo>
    </StyledCard>
  );
}

Card.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  status: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  species: PropTypes.string.isRequired,
  type: PropTypes.string,
  gender: PropTypes.oneOf(['Male', 'Female', 'unknown', 'Genderless']),
  image: PropTypes.string.isRequired,
  onClickHandler: PropTypes.func
};

const StyledCard = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.bgSecondary};
  border-radius: 10px;
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    cursor: pointer;
    transform: scale(1.01);
    box-shadow: 5px 5px 8px rgba(0, 0, 0, 0.2);
  }

  &:hover .card-title {
    color: ${({ theme }) => theme.colors.green};
  }
`;

const CardImg = styled.img`
  border-radius: 10px 10px 0 0;
`;

const CardInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.white};
  padding: 20px;
`;
