import TabItem from "@/components/Tab/TabItem";
import { useState } from "react";
import { FiBook, FiPenTool, FiUser } from "react-icons/fi";

export default function SearchTabs() {
  const [activeTab, setActiveTab] = useState<string>("도서");

  const tabs = [
    { label: "도서", Icon: FiBook },
    { label: "작가", Icon: FiUser },
    { label: "출판사", Icon: FiPenTool },
  ];

  const handleTabClick = (label: string) => {
    setActiveTab(label);
  };

  return (
    <div className='flex justify-start items-center gap-4'>
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
