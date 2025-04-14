import React from 'react';

interface TabsProps {
  options: { label: string; value: string }[];
  value: string;
  onChange?: (key: string) => void;
}

const Tabs: React.FC<TabsProps> = props => {
  const tabChange = (value: string) => {
    props.onChange && props.onChange(value);
  };
  return <div className="uni-tabs">
    {
      props.options.map(i =>
        <div
          key={i.value}
          className={i.value === props.value ? 'uni-tabs-active' : ''}
          onClick={() => tabChange(i.value)}
        >
          {i.label}
        </div>
      )
    }
  </div>;
};
export default Tabs;