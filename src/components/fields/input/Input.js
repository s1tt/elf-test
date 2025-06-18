import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useCallback } from 'react';

export const Input = ({ id, label, value, onChange, ...forwardingProps }) => {
  const handleInputChange = useCallback(
    (e) => {
      const newValue = e.target.value;

      onChange(newValue);
    },
    [onChange]
  );

  return (
    <InputWrapper>
      {label && <StyledLabel htmlFor={id}>{label}</StyledLabel>}
      <StyledInput
        id={id}
        value={value}
        onChange={handleInputChange}
        _withValue={!!value}
        {...forwardingProps}
      />
    </InputWrapper>
  );
};

Input.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

const InputWrapper = styled.div``;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px 14px 10px 15px;
  font-size: ${({ theme }) => theme.fontSize.small};
  letter-spacing: 0.03em;
  border: 1px solid ${({ theme }) => theme.colors.green};
  border-radius: 8px;
  color: ${({ theme, _withValue }) =>
    _withValue ? theme.colors.grayLight : theme.colors.gray};
  background: ${({ theme }) => theme.colors.bgSecondary};
  transition: all 0.3s ease;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:focus {
    outline: none;
    background: ${({ theme }) => theme.colors.bgActive};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray};
  }
`;

const StyledLabel = styled.label``;
