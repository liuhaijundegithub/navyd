import { useEffect, useCallback } from 'react';
import { ConfigProviderProps } from '../../types/ConfigProviderProps';
import generateColor from '../../utils/generateColor';

const ConfigProvider: React.FC<ConfigProviderProps> = props => {
  const { mainColor } = props;
  generateColor(mainColor || '#5198FF');
  return props.children;
};

export default ConfigProvider;