type ButtonType = 'primary' | 'link' | 'default' | 'danger';
type ButtonSize = 'large' | 'small' | 'normal';
type UniButtonProps = {
  type: ButtonType;
  disabled: boolean;
  size: ButtonSize;
  loading: boolean;
}

export type ButtonProps = UniButtonProps & Omit<React.ButtonHTMLAttributes<HTMLElement>, 'type'>;