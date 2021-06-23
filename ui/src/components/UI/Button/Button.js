import React from 'react';
import './Button.css';

const UIButton = ({ children, component: Component, theme,...restProps }) => {
  return (
    <Component className={`ui-button ui-button--${theme}`} {...restProps}>{children}</Component>
  )
}

UIButton.defaultProps = {
  component: 'button',
  theme: 'bordered'
}

export default UIButton;