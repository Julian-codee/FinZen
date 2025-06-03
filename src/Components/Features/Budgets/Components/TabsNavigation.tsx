"use client"

interface TabNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function TabNavigation({ activeTab, onTabChange }: TabNavigationProps) {
  const tabs = [
    { id: "categorias", label: "Categorías" },
    { id: "distribucion", label: "Distribución" },
    { id: "historial", label: "Historial" },
  ]

  return (
    <div className="flex space-x-1 mb-8 bg-[#020817] border border-[#2A3441] p-1 rounded-lg w-fit">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
            activeTab === tab.id ? "bg-[#374151] text-white" : "text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
