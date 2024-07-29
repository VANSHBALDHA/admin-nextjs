const displayData = [
  { id: 1, name: "Modular Wiring Solutions", status: "active" },
  { id: 2, name: "PLC/DCS Field Interface Module", status: "active" },
  { id: 3, name: "Signal Conditioning and Isolator", status: "inactive" },
  { id: 4, name: "Intrinsic Safety Isolator", status: "active" },
  { id: 5, name: "Panel Accessories", status: "inactive" },
  { id: 6, name: "Fiber Optic Patch Panels", status: "active" },
  { id: 7, name: "Prefabricated Cable", status: "active" },
  { id: 8, name: "Customized Solutions", status: "inactive" },
  { id: 9, name: "Industrial Ethernet", status: "active" },
  { id: 10, name: "Profibus and Profinet", status: "inactive" },
  { id: 11, name: "Protocol Gateway and Converter", status: "active" },
  { id: 12, name: "Industrial Connectivity", status: "inactive" },
  { id: 13, name: "Control and Supervisory System", status: "active" },
  { id: 14, name: "Field Instruments", status: "inactive" },
  { id: 15, name: "Process Instruments", status: "active" },
  { id: 16, name: "HART Interfacing", status: "inactive" },
  { id: 17, name: "Foundation Fieldbus", status: "active" },
  { id: 18, name: "HMI and Visualisation", status: "inactive" },
  { id: 19, name: "Surge Protection", status: "active" },
  { id: 20, name: "Process Alarm", status: "inactive" },
  { id: 21, name: "Gas Analysis", status: "active" },
  { id: 22, name: "Gas Detection System", status: "inactive" },
  { id: 23, name: "Fire Alarm System", status: "active" },
  { id: 24, name: "Alcohol and Drug Testing", status: "inactive" },
  { id: 25, name: "Respiratory Protection", status: "active" },
  { id: 26, name: "Power Supplies", status: "inactive" },
  { id: 27, name: "Remote I/O and Controller", status: "active" },
  { id: 28, name: "Energy Metering", status: "inactive" },
  { id: 29, name: "Process Display", status: "active" }
];




const categoryData = [
  { id: 1, categoryName: "Utility Module", status: "active" },
  { id: 2, categoryName: "Power Distribution Module", status: "InActive" },
  { id: 3, categoryName: "Diode Oring Module", status: "InActive" },
  { id: 4, categoryName: "Fan Failure Detection Module", status: "InActive" },
  { id: 5, categoryName: "Digital Thermostat", status: "active" },
  { id: 6, categoryName: "Temperature Monitoring Unit", status: "active" },
  { id: 7, categoryName: "6 Port Din rail Mount Loaded LIU", status: "active" },
  { id: 8, categoryName: "8 Port Din rail Mount Loaded LIU", status: "active" },
  {
    id: 9,
    categoryName: "12 Port Din rail Mount Loaded LIU",
    status: "active",
  },
  {
    id: 10,
    categoryName: "24 Port Din rail Mount Loaded LIU",
    status: "InActive",
  },
  {
    id: 11,
    categoryName: "6/8 Port wall Mount Loaded LIU",
    status: "InActive",
  },
  { id: 12, categoryName: "12 Port wall Mount Loaded LIU", status: "InActive" },
  { id: 13, categoryName: "24 Port wall Mount Loaded LIU", status: "active" },
  { id: 14, categoryName: "48 Port wall Mount Loaded LIU", status: "active" },
  {
    id: 15,
    categoryName: "Mini Rack 6 Port Rack Mount Loaded LIU",
    status: "active",
  },
  {
    id: 16,
    categoryName: "1U 12/24 Port Rack Mount Loaded LIU",
    status: "active",
  },
  {
    id: 17,
    categoryName: "2U 48 Port Rack Mount Loaded LIU",
    status: "active",
  },
  {
    id: 18,
    categoryName: "4U 96 Port Rack Mount Loaded LIU",
    status: "active",
  },
  {
    id: 19,
    categoryName: "1U 12/24 Port Sliding Rack Mount Loaded LIU",
    status: "InActive",
  },
  {
    id: 20,
    categoryName: "2U 48/96 Port Sliding Rack Mount Loaded LIU",
    status: "InActive",
  },
  {
    id: 21,
    categoryName: "4U 96/192 Port Sliding Rack Mount Loaded LIU",
    status: "InActive",
  },
  { id: 22, categoryName: "Single Mode", status: "InActive" },
  { id: 23, categoryName: "Multimode (OM1/OM2)", status: "InActive" },
  { id: 24, categoryName: "Multimode (OM3)", status: "InActive" },
  { id: 25, categoryName: "Multimode (OM4)", status: "active" },
  { id: 26, categoryName: "Simplex and Duplex Patch cords", status: "active" },
];



const combinedData = displayData?.map(displayName => {
  const category = categoryData?.find(category => category?.id === displayName?.id);
  return {
    ...displayName,
    categoryName: category ? category?.categoryName : 'Unknown'
  };
});


export default combinedData;