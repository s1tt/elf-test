import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useCallback } from 'react';

export const Option = ({ option, onChange, selectedValue }) => {
  const handleOptionClick = useCallback(() => {
    onChange(option);
  }, [option, onChange]);

  return (
    <StyledOption
      onClick={handleOptionClick}
      _selected={option.value === selectedValue}
    >
      {option.label}
    </StyledOption>
  );
};

Option.propTypes = {
  option: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string
};

const StyledOption = styled.li`
  padding: 6px 8px;
  cursor: pointer;
  font-weight: ${({ _selected }) => (_selected ? 'bold' : 'normal')};
  background: ${({ _selected, theme }) =>
    _selected ? 'transparent' : theme.colors.white};
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.greenLight};
  }
`;
