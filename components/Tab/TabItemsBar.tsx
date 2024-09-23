import TabItem from "@/components/Tab/TabItem";

interface TabItemsBarProps {
  tabs: { label: string; Icon: any }[];
  activeTab: string;
  onTabChange: (label: string) => void;
}

export default function TabItemsBar({ tabs, activeTab, onTabChange }: TabItemsBarProps) {
  return (
    <div className='flex justify-start items-start gap-4'>
      {tabs.map((tab) => (
        <TabItem
          key={tab.label}
          label={tab.label}
          Icon={tab.Icon}
          isActive={activeTab === tab.label}
          onClick={() => onTabChange(tab.label)}
        />
      ))}
    </div>
  );
}