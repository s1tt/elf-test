import { ReactComponent as Female } from '../../assets/genders/female.svg';
import { ReactComponent as Genderless } from '../../assets/genders/genderless.svg';
import { ReactComponent as Male } from '../../assets/genders/male.svg';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const genderIcons = {
  Male: <Male width={20} height={20} fill="#33b3c8" title="Male" />,
  Female: <Female width={24} height={24} fill="pink" title="Female" />,
  unknown: <Genderless width={24} height={24} fill="#999" title="Genderless" />,
  Genderless: (
    <Genderless width={24} height={24} fill="#999" title="Genderless" />
  )
};

export function CardTitle({ name = '', gender = '', className = '' }) {
  const Icon = genderIcons[gender] || null;

  return (
    <CardTitleContainer className={className}>
      <StyledCardTitle className="card-title">{name}</StyledCardTitle>
      {Icon && <IconContainer>{Icon}</IconContainer>}
    </CardTitleContainer>
  );
}

CardTitle.propTypes = {
  name: PropTypes.string,
  gender: PropTypes.oneOf(['Male', 'Female', 'unknown', 'Genderless']),
  className: PropTypes.string
};

const CardTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const StyledCardTitle = styled.h2`
  margin-right: 8px;
  transition: color 0.3s;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 100%;
  font-size: ${({ theme }) => theme.fontSize.xxlarge};

  @media (max-width: 450px) {
    max-width: 130px;
    font-size: ${({ theme }) => theme.fontSize.medium};
  }
`;

const IconContainer = styled.div`
  display: flex;
`;
