import React, { useMemo } from 'react';
import classNames from 'classnames';
import IconFont from '../iconfont/IconFont';
import { ButtonProps } from '../../types/ButtonProps';
import { CommonHTMLAttributes } from '../../types/global';

const Button: React.FC<Partial<ButtonProps & Omit<CommonHTMLAttributes, 'type'>>> = props => {
  const {
    className,
    disabled,
    type = 'default',
    size = 'normal',
    loading = false,
    ...rest
  } = props;
  const classes = classNames(
    'uni-btn',
    `uni-btn-type-${type}`,
    `uni-btn-size-${size}`,
    className
  );

  const isDisabled = useMemo(() => {
    return disabled || loading;
  }, [disabled, loading]);
  return (
    <button
      { ...rest }
      className={classes}
      disabled={isDisabled}
    >
      {
        props.loading && <IconFont type="loading" className="btn-loading" spin />
      }
      {props.children}
    </button>
  );
};

export default Button;