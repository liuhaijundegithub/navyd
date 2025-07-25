import React, { createContext } from 'react';
import { ConfigProviderProps } from '../../types/ConfigProviderProps';
import generateColor from '../../utils/generateColor';
import config from '../../utils/config';

export const ConfigContext = createContext<ConfigProviderProps>({});
const ConfigProvider: React.FC<ConfigProviderProps> = props => {
  const { mainColor, modal } = props;
  Object.assign(config, props);
  generateColor(mainColor || '#5198FF');
  return <ConfigContext.Provider value={{ modal, mainColor }}>
    {props.children}
  </ConfigContext.Provider>;
};

export default ConfigProvider;