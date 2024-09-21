import TabItem from "@/components/Tab/TabItem";
import { useState } from "react";

interface TabItemsBarProps {
  tabs: { label: string; Icon: any }[];
  firstActive: string;
}

export default function TabItemsBar({tabs, firstActive}: TabItemsBarProps) {
  const [activeTab, setActiveTab] = useState<string>(firstActive);


  const handleTabClick = (label: string) => {
    setActiveTab(label);
  };

  return (
    <div className='flex justify-start items-start gap-4'>
      {tabs.map((tab) => (
        <TabItem
          key={tab.label}
          label={tab.label}
          Icon={tab.Icon}
          isActive={activeTab === tab.label}
          onClick={() => handleTabClick(tab.label)}
        />
      ))}
    </div>
  );
}

