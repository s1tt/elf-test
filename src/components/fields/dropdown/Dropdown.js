import { useCallback, useEffect, useRef, useState } from 'react';

import { Arrow } from './Arrow';
import { CancelButton } from './CancelButton';
import { OptionList } from './OptionList';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export const Dropdown = ({
  placeholder = 'Select',
  options = [],
  value = '',
  onChange = () => {}
}) => {
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOptionListOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedLabel = options.find((opt) => opt.value === value)?.label;

  const handleSelectorClick = useCallback(() => {
    setIsOptionListOpen((isOpen) => !isOpen);
  }, []);

  const handleCancelClick = useCallback(() => {
    onChange('');
  }, [onChange]);

  const handleOptionChange = useCallback(
    (option) => {
      onChange(option.value);
      setIsOptionListOpen(false);
    },
    [onChange]
  );

  return (
    <Wrapper ref={ref}>
      <Selector
        onClick={handleSelectorClick}
        _isOptionListOpen={isOptionListOpen}
        _withValue={!!value}
      >
        <SelectedText>{selectedLabel || placeholder}</SelectedText>

        {value ? (
          <CancelButton onClick={handleCancelClick} />
        ) : (
          <Arrow isOpen={isOptionListOpen} />
        )}
      </Selector>

      {isOptionListOpen && (
        <OptionList
          options={options}
          onChange={handleOptionChange}
          selectedValue={value}
        />
      )}
    </Wrapper>
  );
};

Dropdown.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Selector = styled.div`
  padding: 10px 14px 10px 15px;
  font-size: ${({ theme }) => theme.fontSize.small};
  letter-spacing: 0.03em;
  border: 1px solid ${({ theme }) => theme.colors.green};
  border-radius: 8px;
  background: ${({ theme, _isOptionListOpen }) =>
    _isOptionListOpen ? theme.colors.bgActive : theme.colors.bgSecondary};
  color: ${({ theme, _withValue }) =>
    _withValue ? theme.colors.grayLight : theme.colors.gray};
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.bgActive};
  }
`;

const SelectedText = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
`;
