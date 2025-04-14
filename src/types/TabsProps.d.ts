export interface TabsProps {
  options: { label: string; value: string }[];
  value: string;
  onChange?: (key: string) => void;
}