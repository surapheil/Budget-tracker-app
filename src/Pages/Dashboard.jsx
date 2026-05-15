import { Menu, Bell, Plus, FileText, LogOut } from "lucide-react";

export default function Dashboard({ user, setUser,onClickAdd,onClickSubmissions }) {
  const today = new Date().toLocaleDateString();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

 

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center">
      
      {/* MOBILE FRAME */}
      <div className="w-full max-w-sm bg-white min-h-screen rounded-2xl shadow-md p-4">
        
        {/* TOP BAR */}
        <div className="flex items-center justify-between mb-4">
          <Menu size={22} className="text-gray-600" />
          <h1 className="text-sm font-semibold">
            Welcome, {user.name}
          </h1>
          <Bell size={20} className="text-gray-600" />
        </div>

        {/* REGION + DATE */}
        <div className="flex justify-between items-center mb-6">
          <p className="text-sm text-gray-600">
            Region: {user.region}
          </p>

          <div className="flex items-center gap-2 border px-3 py-1 rounded-md text-xs">
            📅 {today}
          </div>
        </div>

        {/* ADD ACTIVITY CARD */}
        <div onClick={onClickAdd} className="border rounded-xl p-4 flex items-center gap-4 mb-4 shadow-sm hover:bg-gray-50 cursor-pointer">
          <div className="bg-gray-200 p-3 rounded-full">
            <Plus size={18} />
          </div>
          <div>
            <p className="font-medium text-sm">Add Activity</p>
            <p className="text-xs text-gray-500">
              Register a new budget activity
            </p>
          </div>
        </div>

        {/* MY SUBMISSIONS CARD */}
        <div onClick={onClickSubmissions} className="border rounded-xl p-4 flex items-center gap-4 mb-6 shadow-sm hover:bg-gray-50 cursor-pointer">
          <div className="bg-gray-200 p-3 rounded-full">
            <FileText size={18} />
          </div>
          <div>
            <p className="font-medium text-sm">
              My Submissions (Today)
            </p>
            <p className="text-xs text-gray-500">
              View your today's entries
            </p>
          </div>
        </div>

         {user?.users?.[0]?.role === "MANAGER" && (
        <button
          onClick={() =>
            window.open(
              "https://datastudio.google.com/embed/reporting/c63992b1-0a5b-4df3-b807-ecf8f914ddb4/page/QdJyF",
              "_blank"
            )
          }
          className="w-full bg-blue-600 text-white py-3 rounded-xl mt-3"
        >
          Manager Dashboard
        </button>

      )}

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="w-full border py-3 rounded-lg flex items-center justify-center gap-2 text-sm font-medium hover:bg-gray-50"
        >
          LOGOUT <LogOut size={16} />
        </button>

      </div>
    </div>
  );
}