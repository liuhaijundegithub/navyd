import { ModalProps } from './ModalProps';

export interface ConfigProviderProps {
  mainColor?: string;
  children?: React.ReactNode;
  modal?: Partial<ModalProps>
}