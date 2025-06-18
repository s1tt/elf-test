import PropTypes from 'prop-types';
import styled from 'styled-components';

export function Text({
  className,
  children,
  style,
  color = '#ccc',
  fontSize = '16px'
}) {
  return (
    <StyledText
      className={className}
      style={style}
      _color={color}
      _fontSize={fontSize}
    >
      {children}
    </StyledText>
  );
}

Text.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  style: PropTypes.object,
  color: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const StyledText = styled.span`
  color: ${({ _color }) => _color};
  font-size: ${({ _fontSize }) => _fontSize};
`;
