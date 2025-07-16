export interface ModalProps {
  open: boolean;
  children?: React.ReactNode;
  title?: React.ReactNode;
  width?: number;
  onCancel?: () => void;
  onConfirm?: () => void;
  confirmText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
  confirmDisabled?: boolean;
  noPadding?: boolean;
  mask?: boolean;
  footer?: React.ReactNode | null;
  buttonAlign?: 'left' | 'center' | 'right';
}