export interface DrawerProps {
    open: boolean;
    mask?: boolean;
    children?: React.ReactNode;
    title?: React.ReactNode;
    width?: number;
    onCancel?: () => void;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
    confirmLoading?: boolean;
    confirmDisabled?: boolean;
    padding?: number;
    footer?: React.ReactNode | null;
}
