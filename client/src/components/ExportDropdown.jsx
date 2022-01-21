import axios from "../services/axios";

export default function ExportDropdown({ type }) {
  const handleExport = async (filetype) => {
    const baseUrl = (await axios.get("export/base-url")).data;

    window.open(
      `${baseUrl}/${type}/${filetype}?token=${localStorage.getItem(
        "admin-token"
      )}`
    );
  };

  return (
    <div className="relative group">
      <button className="bg-primary text-white py-1 px-3 rounded hover:brightness-[115%] transition duration-300">
        Export
      </button>

      <div
        tabIndex={0}
        className="absolute top-full right-0 flex flex-col items-stretch w-max shadow-md rounded-md overflow-hidden transition-all duration-300 opacity-0 invisible group-focus-within:visible group-focus-within:opacity-100"
      >
        <button
          onClick={() => handleExport("csv")}
          className="text-left bg-white py-2 px-2 hover:brightness-90 transition duration-300"
        >
          Download CSV
        </button>
        <button
          onClick={() => handleExport("xlsx")}
          className="text-left bg-white py-2 px-2 hover:brightness-90 transition duration-300"
        >
          Download XLSX (Excel)
        </button>
        <button
          onClick={() => handleExport("json")}
          className="text-left bg-white py-2 px-2 hover:brightness-90 transition duration-300"
        >
          Download JSON
        </button>
      </div>
    </div>
  );
}
