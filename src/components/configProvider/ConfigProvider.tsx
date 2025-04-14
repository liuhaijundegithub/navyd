import { useEffect } from 'react';
import { ConfigProviderProps } from '../../types/ConfigProviderProps';
import generateColor from '../../utils/generateColor';

const ConfigProvider: React.FC<ConfigProviderProps> = props => {
  const { mainColor } = props;
  useEffect(() => {
    generateColor(mainColor || '#5198FF');
  }, [mainColor]);
  return props.children;
};

export default ConfigProvider;