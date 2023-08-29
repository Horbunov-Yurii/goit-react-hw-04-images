import PropTypes from 'prop-types';
import { LoadMoreBtn } from './Button.styled';

export const Button = ({ handleClick, text }) => {
  return (
    <LoadMoreBtn type="button" onClick={handleClick}>
      {text}
    </LoadMoreBtn>
  );
};

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
};
