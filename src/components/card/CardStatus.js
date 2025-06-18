import PropTypes from 'prop-types';
import styled from 'styled-components';

export function CardStatus({
  status = '',
  species = '',
  type = '',
  className = ''
}) {
  return (
    <CardStatusContainer className={className}>
      <StyledCardStatus status={status}>{status}</StyledCardStatus>
      &nbsp;-&nbsp;
      <CardSpecies>{species}</CardSpecies>
      {type && <CardType>{type}</CardType>}
    </CardStatusContainer>
  );
}

CardStatus.propTypes = {
  status: PropTypes.string,
  species: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string
};

const CardStatusContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const StyledCardStatus = styled.span`
  display: flex;
  align-items: center;
  text-transform: capitalize;

  &::before {
    content: '';
    display: block;
    margin-right: 8px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background-color: ${({ status, theme }) => {
      switch (status) {
        case 'Alive':
          return theme.colors.green;
        case 'Dead':
          return theme.colors.red;
        default:
          return theme.colors.gray;
      }
    }};
  }
`;

const CardSpecies = styled.span``;

const CardType = styled.p`
  margin-top: 20px;
  width: 100%;
  color: ${({ theme }) => theme.colors.grayLight};
  font-size: ${({ theme }) => theme.fontSize.small};
`;
