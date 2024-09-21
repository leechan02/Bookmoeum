import TabItem from "@/components/Tab/TabItem";
import { useState } from "react";
import { FiBook, FiBox, FiClipboard } from "react-icons/fi";

export default function CategoryTabs() {
  const [activeTab, setActiveTab] = useState<string>("책 소개");

  const tabs = [
    { label: "책 소개", Icon: FiBook },
  ];

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
