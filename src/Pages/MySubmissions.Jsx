import { useEffect, useState } from "react";


export default function MySubmissions({ user, goBack }) {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editingItem, setEditingItem] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(user.users?.[0]?.name || "");

  const [editForm, setEditForm] = useState({
    outlet: "",
    quantity: "",
    remark: "",
  });

  const GAS_URL = "https://script.google.com/macros/s/AKfycbzbzL0GlyAiIjpuyKBgqtFhd3KCIJ3qyHKwq2kiKHz3f9NwSyUB-gm5vyzW09Wb8Tha/exec"
  useEffect(() => {
    fetch(`/api/getActivities?agent=${user.users?.[0]?.name}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res.data || []);
      });
  }, []);

  useEffect(() => {
    console.log("Selected Agent:", selectedAgent);
        fetch(
          `/api/getActivities?agent=${selectedAgent}`
        )
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            setData(res.data || []);
          });

      }, [selectedAgent]);


  const handleDelete = async (rowId) => {
  const res = await fetch(
    `${GAS_URL}?action=deleteActivity&rowId=${rowId}`
  );

  const data = await res.json();

  if (data.status === "success") {

    setData((prev) =>
      prev.filter((item) => item.rowId !== rowId)
    );
  }
};


const filteredData =
  filter === "All"
    ? data
    : data.filter(
        (item) => item.activityType === filter
      );


const openEdit = (item) => {

  setEditingItem(item);

  setEditForm({
    outlet: item.outlet,
    quantity: item.quantity,
    remark: item.remark,
  });
};  

const saveEdit = async () => {

  const query = new URLSearchParams({
    rowId: editingItem.rowId,
    outlet: editForm.outlet,
    quantity: editForm.quantity,
    remark: editForm.remark,
  });

  const res = await fetch(
    `/api/editActivity?${query.toString()}`
  );

  const data = await res.json();

  if (data.status === "success") {

    setData((prev) =>
      prev.map((item) =>
        item.rowId === editingItem.rowId
          ? {
              ...item,
              ...editForm,
            }
          : item
      )
    );

    setEditingItem(null);

  } else {

    alert("Update failed");

  }
};

  return (
  <div className="min-h-screen bg-gray-200 flex justify-center">
    <div className="w-full max-w-sm bg-white min-h-screen p-4">

      {/* HEADER */}
      <button onClick={goBack} className="mb-4 text-sm">
        ← Back
      </button>

      {/* TITLE */}
      <h1 className="text-lg font-semibold text-center mb-4">
        My Submissions (Today)
      </h1>
      
        <select
            value={selectedAgent}
            onChange={(e) =>
              setSelectedAgent(e.target.value)
            }
            className="w-full border p-2 rounded mb-4"
          >

            {user.users.map((item, index) => (

              <option
                key={index}
                value={item.name}
              >
                {item.name}
              </option>

            ))}

          </select>
      {/* 👇 PUT FILTER BUTTONS HERE */}
      <div className="flex gap-2 mb-4">

        <button
          onClick={() => setFilter("All")}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === "All"
              ? "bg-black text-white"
              : "border"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("Volume Incentive")}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === "Volume Incentive"
              ? "bg-black text-white"
              : "border"
          }`}
        >
          Volume
        </button>

        <button
          onClick={() => setFilter("POSM")}
          className={`px-3 py-1 rounded-full text-sm ${
            filter === "POSM"
              ? "bg-black text-white"
              : "border"
          }`}
        >
          POSM
        </button>

      </div>

      {/* LIST */}
      <div className="space-y-3">

        {filteredData.map((item, index) => (

      <div
        key={index}
        className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm"
      >

        {/* TOP
        <div className="flex justify-between items-start">

          <div>
            <h2 className="font-semibold text-sm">
              {item.outlet}
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              {item.area}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">
              {new Date(item.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <div className="flex gap-2 mt-4">

              <button
                onClick={() => openEdit(item)}
                className="bg-blue-500 text-white text-[11px] px-3 py-1 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(item.rowId)}
                className="bg-red-500 text-white text-[11px] px-3 py-1 rounded-lg"
              >
                Delete
              </button>

            </div>
          </div>

        </div> */}
        {/* TOP */}
<div className="flex justify-between items-start w-full relative">

  <div className="min-w-0 flex-1">
    <h2 className="font-semibold text-sm text-gray-900 dark:text-white">
      {item.outlet}
    </h2>
    <p className="text-xs text-gray-500 mt-1">
      {item.area}
    </p>
  </div>

  <div className="text-right flex-shrink-0 ml-4 relative z-10">
    <p className="text-xs text-gray-500 mb-4">
      {new Date(item.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      })}
    </p>

    <div className="flex gap-2 justify-end">

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          openEdit(item);
        }}
        /* 
           1. Added z-20 to pull text above any overlays 
           2. Added !text-white to override global text colors
           3. Added font-bold for better visibility
        */
        className="relative z-20 bg-blue-600 !text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-md cursor-pointer hover:bg-blue-700 active:scale-95 transition-all"
      >
        EDIT
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          handleDelete(item.rowId);
        }}
        className="relative z-20 bg-red-600 !text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-md cursor-pointer hover:bg-red-700 active:scale-95 transition-all"
      >
        DELETE
      </button>

    </div>
  </div>

</div>
        
        {/* ACTIVITY */}
        <div className="mt-3">

          <p className="text-sm font-medium">
            {item.activityType}
          </p>

          <p className="text-xs text-gray-600 mt-1">
            {item.remark}
          </p>

        </div>

        {/* DETAILS */}
        <div className="flex gap-2 mt-4">

        {/* QUANTITY */}
        <div className="flex-1 bg-gray-100 rounded-xl px-3 py-2 min-w-0">
          
          <p className="text-[10px] text-gray-500">
            Quantity
          </p>

          <p className="font-semibold text-xs truncate">
            {item.quantity} Kegs
          </p>

        </div>

        {/* BUDGET */}
        <div className="flex-1 bg-gray-100 rounded-xl px-3 py-2 min-w-0">

          <p className="text-[10px] text-gray-500">
            Budget
          </p>

          <p className="font-semibold text-xs truncate">
            {Number(item.budget).toLocaleString()} Birr
          </p>

        </div>

      </div>
          <div className="mt-5 flex items-center justify-between gap-2 min-w-0">

            <div className="mt-3">

              <div className="inline-flex items-center bg-black text-white text-[10px] px-3 h-6 rounded-full">
                {item.brand}
              </div>

            </div>

            {/* <div className="flex gap-2 mt-4"> */}
{/* 
            <button
              onClick={() => openEdit(item)}
              className="bg-blue-500 text-white text-[11px] px-3 py-1 rounded-lg"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(item.rowId)}
              className="bg-red-500 text-white text-[11px] px-3 py-1 rounded-lg"
            >
              Delete
            </button>

          </div> */}

            {/* AGENT */}
            <span className="text-[10px] text-gray-500 truncate">
              {item.agent}
            </span>

        </div>

      </div>

        ))}

      </div>

    </div>
    {editingItem && (

  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

    <div className="bg-white w-[90%] max-w-sm rounded-2xl p-4">

      <h2 className="font-semibold text-lg mb-4">
        Edit Submission
      </h2>

      {/* OUTLET */}
      <input
        type="text"
        value={editForm.outlet}
        onChange={(e) =>
          setEditForm({
            ...editForm,
            outlet: e.target.value,
          })
        }
        className="w-full border rounded-lg p-2 mb-3"
        placeholder="Outlet"
      />

      {/* QUANTITY */}
      <input
        type="number"
        value={editForm.quantity}
        onChange={(e) =>
          setEditForm({
            ...editForm,
            quantity: e.target.value,
          })
        }
        className="w-full border rounded-lg p-2 mb-3"
        placeholder="Quantity"
      />

      {/* REMARK */}
      <input
        type="text"
        value={editForm.remark}
        onChange={(e) =>
          setEditForm({
            ...editForm,
            remark: e.target.value,
          })
        }
        className="w-full border rounded-lg p-2 mb-4"
        placeholder="Remark"
      />

      {/* ACTIONS */}
      <div className="flex justify-end gap-2">

        <button
          onClick={() => setEditingItem(null)}
          className="border px-4 py-2 rounded-lg"
        >
          Cancel
        </button>

        <button
          onClick={saveEdit}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Save
        </button>

      </div>

    </div>

  </div>

)}
  </div>
);
}