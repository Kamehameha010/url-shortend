import { JSX, useState } from "react";
import TabShortendUrl from "./TabShortenUrl";
import TabLookup from "./TabLookup";
import TabStatistics from "./TabStatistics";

interface Tab {
  id: string;
  label: string;
}

type TabKeys = 'tab1' | 'tab2' | 'tab3';

const tabs: Array<Tab> = [
  {
    id: "tab1",
    label: "Shortend URL",
  },
  {
    id: "tab2",
    label: "Lookup",
  },
  {
    id: "tab3",
    label: "Statistics",
  },
];


const tabContent:Record<TabKeys,JSX.Element> ={
  tab1: <TabShortendUrl />,
  tab2: <TabLookup />,
  tab3: <TabStatistics />
}

export default function TabContainer() {
  const [active, setActive] = useState<string>(tabs[0].id);
  return (
    <>
      <div className="h-9 bg-gray-200 flex justify-evenly items-center rounded-xs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`bg-${active === tab.id ? "gray-50" : "gray-200"}
             text-sm h-8 w-30 rounded-xs
             `}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {
        tabContent[active as TabKeys]
      }
    </>
  );
}
