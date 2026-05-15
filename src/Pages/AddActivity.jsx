import { useState, useEffect } from "react";

export default function AddActivity({ user, goBack }) {
  const today = new Date().toLocaleDateString();
  const [selectedAgent, setSelectedAgent] = useState("");
  const [outlet, setOutlet] = useState("");
  const [area, setArea] = useState("Bole");
  const [brand, setBrand] = useState("Habesha");
  const [activityType, setActivityType] = useState("Volume Incentive");
  const [remark, setRemark] = useState("10+1");
  const [quantity, setQuantity] = useState(0);
  const [outletId, setOutletId] = useState("");
  const [isOther, setIsOther] = useState(false);
  const [activityTypes, setActivityTypes] = useState([]);
  const [remarks, setRemarks] = useState([]);
  const [unitPrice, setUnitPrice] = useState(0);
  const [region, setRegion] = useState( user?.users?.[0]?.region || "");

  // SYSTEM CONTROLLED PRICE
  const budget =
  quantity * unitPrice;

//  const handleSubmit = async () => {
//   try {
//     const res = await fetch(
//       `/api/addActivity?region=${selectedAgent.region}&agent=${selectedAgent}&outlet=${outlet}&area=${area}&brand=${brand}&activityType=${activityType}&remark=${remark}&quantity=${quantity}&unitPrice=${unitPrice}&budget=${budget}`
//     );

//     const data = await res.json();

//     if (data.status === "success") {
//       alert("Activity saved successfully");
//       goBack();
//     } else {
//       alert("Failed to save");
//     }
//   } catch (err) {
//     console.error(err);
//     alert("Server error");
//   }
// };


const handleSubmit = async () => {

  console.log({
    selectedAgent,
    region,
    outlet,
    area,
  });



  try {

    const res = await fetch(

      `/api/addActivity?
      region=${encodeURIComponent(region)}
      &agent=${encodeURIComponent(selectedAgent)}
      &outlet=${encodeURIComponent(outlet)}
      &area=${encodeURIComponent(area)}
      &brand=${encodeURIComponent(brand)}
      &activityType=${encodeURIComponent(activityType)}
      &remark=${encodeURIComponent(remark)}
      &quantity=${quantity}
      &unitPrice=${unitPrice}
      &budget=${budget}`

    );

    const data = await res.json();

    console.log(data);

    if (data.status === "success") {

      alert("Activity saved successfully");

      goBack();

    } else {

      alert("Failed to save");

    }

  } catch (err) {

    console.error(err);

    alert("Server error");

  }
};

const handleOutletSearch = async (id) => {

  setOutletId(id);

  if (!id) return;

  try {

    const res = await fetch(
      `/api/getOutlet?outletId=${id}`
    );

    const data = await res.json();

    if (data.status === "success") {

      setOutlet(data.outlet);

     setArea(data.area || "")

    }

  } catch (err) {

    console.error(err);

  }
};

useEffect(() => {

  if (user?.users?.length > 0) {

    const firstAgent = user.users[0];

    setSelectedAgent(firstAgent.name);

    setRegion(firstAgent.region || "");

    handleGetPrice(firstAgent.name);

  }

}, [user]);


useEffect(() => {

  fetch("/api/getActivityConfig")
    .then((res) => res.json())
    .then((data) => {

      console.log(data);

      setActivityTypes(
        data.activityTypes || []
      );

    });

}, []);

const handleAgentChange = async (value) => {

  setSelectedAgent(value);

  const foundAgent = user.users.find(
    (item) => item.name === value
  );

  console.log(foundAgent);

  setRegion(
    foundAgent?.region || ""
  );

  handleGetPrice(value);
};

// const handleAgentChange = async (value) => {

//   setSelectedAgent(value);

//   try {

//     const res = await fetch(
//       `/api/getPrice?agent=${value}`
//     );

//     const data = await res.json();

//     setUnitPrice(
//       Number(data.price || 0)
//     );

//   } catch (err) {

//     console.error(err);

//   }
// };


console.log({
  selectedAgent,
  area,
  outlet,
});

const handleActivityChange = async (value) => {

  setActivityType(value);

  try {

    const res = await fetch(
      `/api/getActivityConfig?activityType=${value}`
    );

    const data = await res.json();

    setRemarks(data.remarks || []);

    // AUTO SELECT FIRST REMARK
    if (data.remarks?.length > 0) {

      setRemark(data.remarks[0]);

    } else {

      setRemark("");

    }

  } catch (err) {

    console.error(err);

  }
};

const handleGetPrice = async (agentName) => {

  try {

    const res = await fetch(
      `/api/getPrice?agent=${encodeURIComponent(agentName)}`
    );

    const data = await res.json();

    setUnitPrice(
      Number(data.price || 0)
    );

  } catch (err) {

    console.error(err);

    setUnitPrice(0);

  }
};

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center">
      <div className="w-full max-w-sm bg-white min-h-screen p-4">

        {/* HEADER */}
        <button onClick={goBack} className="mb-4 text-sm">
          ← Back
        </button>

        <h1 className="text-lg font-semibold mb-4 text-center">
          Add New Activity
        </h1>

        {/* FORM */}
        <div className="space-y-3">

          {/* REGION */}
          {/* <div>
            <label className="text-xs">Region</label>
            <input
              value={user?.region || ""}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div> */}

          <div>
              <label className="text-xs">
                Region
              </label>

              <input
                value={region || ""}
                disabled
                className="w-full border p-2 rounded bg-gray-100"
              />
            </div>

          <div>
              <div>
                    <label className="text-xs">
                      Agent Name *
                    </label>

                    <select
                      value={selectedAgent || ""}
                      onChange={(e) =>
                        handleAgentChange(e.target.value)
                      }
                      className="w-full border p-2 rounded"
                    >

                      {user?.users?.map((item, index) => (

                        <option
                          key={index}
                          value={item.name}
                        >
                          {item.name}
                        </option>

                      ))}

                    </select>
                  </div>
                </div>

{/* 
          <div>
              <label className="text-xs">
                Select Agent *
              </label>

              <select
                value={selectedAgent.name}
                onChange={(e) => {

                  const found = user.users.find(
                    (u) => u.name === e.target.value
                  );

                  setSelectedAgent(found);
                }}
                className="w-full border p-2 rounded"
              >

                {user.users.map((agent, index) => (

                  <option
                    key={index}
                    value={agent.name}
                  >
                    {agent.name}
                  </option>

                ))}

              </select>
            </div> */}

          {/* OUTLET */}
          <div>
            <label className="text-xs">
              Outlet ID *
            </label>

            <input
              placeholder="Enter Outlet ID"
              value={outletId}
              onChange={(e) =>
                handleOutletSearch(e.target.value)
              }
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="text-xs">
              Outlet Name
            </label>

            <input
              value={outlet || ""}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {/* AREA */}
          <div> 
            <label className="text-xs"> Area </label>

            <input value={area || ""} disabled className="w-full border p-2 rounded bg-gray-100" />

          </div>

          {/* DATE */}
          <div>
            <label className="text-xs">Date *</label>
            <input
              value={today}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          {/* BRAND */}
          <div>
            <label className="text-xs">Brand *</label>
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option>Habesha 30L KEG Draught Beer</option>
              <option>Kidame Draught</option>
            </select>
          </div>

          {/* ACTIVITY TYPE */}
         <div>
            <label className="text-xs">
              Activity Type *
            </label>

            <select
              value={activityType}
              onChange={(e) =>
                handleActivityChange(e.target.value)
              }
              className="w-full border p-2 rounded"
            >

              <option value="">
                Select Activity Type
              </option>

              {activityTypes.map((item, index) => (

                <option
                  key={index}
                  value={item}
                >
                  {item}
                </option>

              ))}

            </select>
          </div>

          <div>
              <label className="text-xs">
                Remark *
              </label>

              <select
                value={remark}
                onChange={(e) =>
                  setRemark(e.target.value)
                }
                className="w-full border p-2 rounded"
              >

                <option value="">
                  Select Remark
                </option>

                {remarks.map((item, index) => (

                  <option
                    key={index}
                    value={item}
                  >
                    {item || "No Remark"}
                  </option>

                ))}

              </select>
            </div>

            {/* RIGHT SIDE PANEL */}
            <div className="w-1/2 space-y-2">
              
              {/* <div>
                <label className="text-xs">Unit Price</label>
                <div className="border p-2 rounded bg-gray-100 text-sm">
                  {unitPrice.toLocaleString()} Birr
                </div>
              </div> */}

              <div>
                  <label className="text-xs">
                    Unit Price
                  </label>

                  <div className="border p-2 rounded bg-gray-100 text-sm">
                    {unitPrice.toLocaleString()} Birr
                  </div>
                </div>

              <div>
                <label className="text-xs">Budget Used</label>
                <div className="border p-2 rounded bg-gray-100 text-sm">
                  {budget.toLocaleString()} Birr
                </div>
              </div>

            
          </div>

          {/* QUANTITY */}
          <div>
            <label className="text-xs">Quantity (Kegs) *</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="w-full border p-2 rounded"
            />
          </div>

        </div>

        {/* SUBMIT */}
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white py-3 rounded-lg mt-6"
        >
          SUBMIT ENTRY
        </button>

      </div>
   </div>
  );
}