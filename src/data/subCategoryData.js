const categoryData = [
  { id: 1, categoryName: "Utility Module" },
  { id: 2, categoryName: "Power Distribution Module" },
  { id: 3, categoryName: "Diode Oring Module" },
  { id: 4, categoryName: "Fan Failure Detection Module" },
  { id: 5, categoryName: "Digital Thermostat" },
  { id: 6, categoryName: "Temperature Monitoring Unit" },
  { id: 7, categoryName: "6 Port Din rail Mount Loaded LIU" },
  { id: 8, categoryName: "8 Port Din rail Mount Loaded LIU" },
  { id: 9, categoryName: "12 Port Din rail Mount Loaded LIU" },
  { id: 10, categoryName: "24 Port Din rail Mount Loaded LIU" },
  { id: 11, categoryName: "6/8 Port wall Mount Loaded LIU" },
  { id: 12, categoryName: "12 Port wall Mount Loaded LIU" },
  { id: 13, categoryName: "24 Port wall Mount Loaded LIU" },
  { id: 14, categoryName: "48 Port wall Mount Loaded LIU" },
  { id: 15, categoryName: "Mini Rack 6 Port Rack Mount Loaded LIU" },
  { id: 16, categoryName: "1U 12/24 Port Rack Mount Loaded LIU" },
  { id: 17, categoryName: "2U 48 Port Rack Mount Loaded LIU" },
  { id: 18, categoryName: "4U 96 Port Rack Mount Loaded LIU" },
  { id: 19, categoryName: "1U 12/24 Port Sliding Rack Mount Loaded LIU" },
  { id: 20, categoryName: "2U 48/96 Port Sliding Rack Mount Loaded LIU" },
  { id: 21, categoryName: "4U 96/192 Port Sliding Rack Mount Loaded LIU" },
  { id: 22, categoryName: "Single Mode" },
  { id: 23, categoryName: "Multimode (OM1/OM2)" },
  { id: 24, categoryName: "Multimode (OM3)" },
  { id: 25, categoryName: "Multimode (OM4)" },
  { id: 26, categoryName: "Simplex and Duplex Patch cords" },
];

const subCategoryData = [
  { id: 1, subCategoryName: "DC Relay Module", status: "active", subCategoryNameId: "dc-relay-module" },
  { id: 2, subCategoryName: "DC Relay Module", status: "InActive", subCategoryNameId: "dc-relay-module" },
  { id: 3, subCategoryName: "DC Relay Module", status: "InActive", subCategoryNameId: "dc-relay-module" },
  { id: 4, subCategoryName: "AC Relay Module", status: "InActive", subCategoryNameId: "ac-relay-module" },
  { id: 5, subCategoryName: "AC Relay Module", status: "InActive", subCategoryNameId: "ac-relay-module" },
  { id: 6, subCategoryName: "AC Relay Module", status: "active", subCategoryNameId: "ac-relay-module" },
  { id: 7, subCategoryName: "DC Output Solid State Relay Module", status: "active", subCategoryNameId: "dc-output-solid-state-relay-module" },
  { id: 8, subCategoryName: "AC Output Solid State Relay Module", status: "active", subCategoryNameId: "ac-output-solid-state-relay-module" },
  { id: 9, subCategoryName: "Slim Relay Modules", status: "active", subCategoryNameId: "slim-relay-modules" },
  { id: 10, subCategoryName: "Passive Interface Module", status: "active", subCategoryNameId: "passive-interface-module" },
  { id: 11, subCategoryName: "CNC Interface Modules", status: "active", subCategoryNameId: "cnc-interface-modules" },
  { id: 12, subCategoryName: "Special DI LFD Moduls", status: "active", subCategoryNameId: "special-di-lfd-moduls" },
  { id: 13, subCategoryName: "Field Interface Module (Non-redundant I/O)", status: "active", subCategoryNameId: "field-interface-module-non-redundant-io" },
  { id: 14, subCategoryName: "Field Interface Module (Non-redundant I/O)", status: "active", subCategoryNameId: "field-interface-module-non-redundant-io" },
  { id: 15, subCategoryName: "Field Interface Module (Non-redundant I/O)", status: "active", subCategoryNameId: "field-interface-module-non-redundant-io" },
  { id: 16, subCategoryName: "Field Interface Module (Non-redundant I/O)", status: "active", subCategoryNameId: "field-interface-module-non-redundant-io" },
  { id: 17, subCategoryName: "Field Interface Module (Redundant I/O)", status: "active", subCategoryNameId: "field-interface-module-redundant-io" },
  { id: 18, subCategoryName: "Field Interface Module (Redundant I/O)", status: "active", subCategoryNameId: "field-interface-module-redundant-io" },
  { id: 19, subCategoryName: "Field Interface Module (Redundant I/O)", status: "active", subCategoryNameId: "field-interface-module-redundant-io" },
  { id: 20, subCategoryName: "Field Interface Module (Redundant I/O)", status: "active", subCategoryNameId: "field-interface-module-redundant-io" },
];


const combinedData = subCategoryData.map(subCategory => {
  const category = categoryData.find(category => category.id === subCategory.id);
  return {
    ...subCategory,
    categoryName: category ? category.categoryName : 'Unknown'
  };
});

export default combinedData;
