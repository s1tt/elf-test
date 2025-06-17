import { Option } from './Option';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const OptionList = ({ options = [], onChange, selectedValue }) => {
  return (
    <OptionsListContainer>
      {options.map((option) => (
        <Option
          key={option.id}
          option={option}
          onChange={onChange}
          selectedValue={selectedValue}
        />
      ))}
    </OptionsListContainer>
  );
};

OptionList.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string
};

const OptionsListContainer = styled.ul`
  margin-top: 5px;
  border-radius: 6px;
  list-style: none;
  border: 1px solid ${({ theme }) => theme.colors.white};
  max-height: 160px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.white};
  position: absolute;
  width: 100%;
  z-index: 1000;
`;
