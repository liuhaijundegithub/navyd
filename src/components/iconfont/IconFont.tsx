import classNames from 'classnames';
import React from 'react';
import { CommonHTMLAttributes } from '../../types/global';

type IconFontProps = Partial<Omit<CommonHTMLAttributes, 'type'>> & {
  type: string;
  className?: string;
  spin?: boolean;
};

const IconFont: React.FC<IconFontProps> = props => {
  const {
    spin = false,
    ...rest
  } = props;
  const cls = classNames(
    'uni-iconfont',
    'iconfont',
    props.type.includes('icon') ? props.type : `icon-${props.type}`,
    { 'iconfont-spinning': spin },
    props.className
  );
  return <span
    { ...rest }
    className={cls}
  />;
};

export default IconFont;