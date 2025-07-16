import React, { createContext } from 'react';
import { ConfigProviderProps } from '../../types/ConfigProviderProps';
import generateColor from '../../utils/generateColor';

export const ConfigContext = createContext<ConfigProviderProps>({});
const ConfigProvider: React.FC<ConfigProviderProps> = props => {
  const { mainColor, modal } = props;
  generateColor(mainColor || '#5198FF');
  return <ConfigContext.Provider value={{ modal }}>
    {props.children}
  </ConfigContext.Provider>;
};

export default ConfigProvider;