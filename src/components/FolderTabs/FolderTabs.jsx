import React, { useState } from "react";

export default function FolderTabs({ tabs }) {
  // Stan przechowuje indeks aktualnie wybranej zakładki (domyślnie 0 - pierwsza)
  const [activeTab, setActiveTab] = useState(0);

  // Stylizacja (możesz to przenieść do CSS/Sass)
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
    },
    tabHeader: {
      display: "flex",
      borderBottom: "2px solid #ccc",
      paddingLeft: "10px",
    },
    tabButton: (isActive) => ({
      padding: "10px 20px",
      cursor: "pointer",
      border: "1px solid #ccc",
      borderBottom: isActive ? "2px solid white" : "1px solid #ccc", // "Ukrywa" dolną krawędź aktywnego
      backgroundColor: isActive ? "#fff" : "#f4f4f4",
      color: isActive ? "#000" : "#666",
      fontWeight: isActive ? "bold" : "normal",
      marginBottom: "-2px", // Ważne: nasuwa przycisk na linię oddzielającą
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
      marginRight: "4px",
      transition: "background-color 0.2s",
    }),
    content: {
      border: "1px solid #ccc",
      borderTop: "none", // Brak górnej ramki, bo zastępują ją zakładki
      padding: "20px",
      backgroundColor: "#fff",
      borderRadius: "0 0 8px 8px", // Zaokrąglenie tylko na dole
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    },
  };

  return (
    <div style={styles.container}>
      {/* Pasek z "uszami" teczki */}
      <div style={styles.tabHeader}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            style={styles.tabButton(activeTab === index)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Zawartość "pliku" */}
      <div style={styles.content}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
}