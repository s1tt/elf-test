import { Filters } from './filters';
import { Logo } from './Logo';
import styled from 'styled-components';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Filters />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 950px) {
    flex-direction: column;
    gap: 10px;
  }
`;
