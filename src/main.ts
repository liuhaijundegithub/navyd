import './style/index.less';
import './utils/generateColor.ts';

// layer
export { default as layer } from './components/layer/Layer';

// modal

export { default as Modal } from './components/modal/Modal';
export type { ModalProps } from './types/ModalProps';

// button
export { default as Button } from './components/button/Button';
export type { ButtonProps } from './types/ButtonProps';

// drawer
export { default as Drawer } from './components/drawer/Drawer';
export type { DrawerProps } from './types/DrawerProps';

// tabs
export { default as Tabs } from './components/tabs/Tabs';
export type { TabsProps } from './types/TabsProps';

// configProvider
export { default as ConfigProvider } from './components/configProvider/ConfigProvider';
export type { ConfigProviderProps } from './types/ConfigProviderProps';
