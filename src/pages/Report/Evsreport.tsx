import { useState } from "react";
import Navbar from "../Navbar/Navbar";

const RecordTable = () => {
  const [data, setData] = useState([
    {
      name: "Ethan Smith",
      mobileNumber: "+1 (907) 220-9019",
      type: "Check Out",
      purpose: "Study",
      date: "Mon 19 Sep. 2022",
      checkin: "09:54 AM",
      checkout: "08:00 PM",
      totalTime: "10H:6M",
    },
    {
      name: "Lea Fox",
      mobileNumber: "+1 (907) 826-3317",
      type: "Check Out",
      purpose: "Event",
      date: "Mon 19 Sep. 2022",
      checkin: "09:49 AM",
      checkout: "08:00 PM",
      totalTime: "1CH:11M",
    },
      {
      name: "Lea Fox",
      mobileNumber: "+1 (907) 826-3317",
      type: "Check Out",
      purpose: "Event",
      date: "Mon 19 Sep. 2022",
      checkin: "09:49 AM",
      checkout: "08:00 PM",
      totalTime: "1CH:11M",
    },
      {
      name: "Lea Fox",
      mobileNumber: "+1 (907) 826-3317",
      type: "Check Out",
      purpose: "Event",
      date: "Mon 19 Sep. 2022",
      checkin: "09:49 AM",
      checkout: "08:00 PM",
      totalTime: "1CH:11M",
    },
      {
      name: "Lea Fox",
      mobileNumber: "+1 (907) 826-3317",
      type: "Check Out",
      purpose: "Event",
      date: "Mon 19 Sep. 2022",
      checkin: "09:49 AM",
      checkout: "08:00 PM",
      totalTime: "1CH:11M",
    },
      {
      name: "Lea Fox",
      mobileNumber: "+1 (907) 826-3317",
      type: "Check Out",
      purpose: "Event",
      date: "Mon 19 Sep. 2022",
      checkin: "09:49 AM",
      checkout: "08:00 PM",
      totalTime: "1CH:11M",
    },
  ]);

  const [darkMode] = useState(false);

  const handleEdit = (index: number) => {
    console.log("Edit record", index);
  };

  const handleDelete = (index: number) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar />

      {/* Toggle Button */}
      <div className="flex justify-end p-4 md:ml-12">
       
      </div>

      {/* Table Container */}
      <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md ml-0 md:ml-12 w-full transition-colors duration-300">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            142 Total Records
          </h1>
          <input
            type="text"
            placeholder="Search..."
            className="border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 rounded-md px-4 py-2 w-full md:w-64"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-gray-800 dark:text-gray-200">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="px-2 py-2 text-left">Name</th>
                <th className="px-2 py-2 text-left">Mobile Number</th>
                <th className="px-2 py-2 text-left">Type</th>
                <th className="px-2 py-2 text-left">Purpose</th>
                <th className="px-2 py-2 text-left">Date</th>
                <th className="px-2 py-2 text-left">Checkin</th>
                <th className="px-2 py-2 text-left">Checkout</th>
                <th className="px-2 py-2 text-left">Total Time</th>
                <th className="px-2 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`border-b border-gray-300 dark:border-gray-700 ${
                    index % 2 === 0
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "bg-white dark:bg-gray-900"
                  }`}
                >
                  <td className="px-2 py-2">{item.name}</td>
                  <td className="px-2 py-2">{item.mobileNumber}</td>
                  <td className="px-2 py-2">{item.type}</td>
                  <td className="px-2 py-2">{item.purpose}</td>
                  <td className="px-2 py-2">{item.date}</td>
                  <td className="px-2 py-2">{item.checkin}</td>
                  <td className="px-2 py-2">{item.checkout}</td>
                  <td className="px-2 py-2">{item.totalTime}</td>

                  {/* Dropdown */}
                  <td className="px-2 py-2 relative">
                    <div className="dropdown inline-block relative">
                      <button className="bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-400 dark:hover:bg-gray-600">
                        Actions
                      </button>
                      <ul className="dropdown-menu absolute hidden text-gray-700 dark:text-gray-100 dark:bg-gray-800 pt-1">
                        <li>
                          <button
                            onClick={() => handleEdit(index)}
                            className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-4 block"
                          >
                            Edit
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => handleDelete(index)}
                            className="bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 py-1 px-4 block"
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-4 gap-4">
          <span className="text-gray-500 dark:text-gray-400">
            Showing 1 to {data.length} of {data.length} entries
          </span>
          <div className="flex flex-wrap gap-2">
            {["First", "Previous", "1", "2", "3", "Next", "Last"].map(
              (label, idx) => (
                <button
                  key={idx}
                  className="bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-md px-4 py-2"
                >
                  {label}
                </button>
              )
            )}
          </div>
        </div>
      </div>

      {/* Dropdown Styles */}
      <style>
        {`
          .dropdown:hover .dropdown-menu {
            display: block;
          }
        `}
      </style>
    </div>
  );
};

export default RecordTable;
