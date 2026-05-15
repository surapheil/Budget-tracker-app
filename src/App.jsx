import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddActivity from "./pages/AddActivity";
import MySubmissions from "./pages/MySubmissions";


function App() {

  const savedUser = localStorage.getItem("user");

  let parsedUser = null;

  try {

    parsedUser = savedUser
      ? JSON.parse(savedUser)
      : null;

  } catch (err) {

    parsedUser = null;

    localStorage.removeItem("user");
  }

  const [user, setUser] = useState(parsedUser);

  const [page, setPage] = useState("dashboard");

  if (page === "submissions") {
    return (
      <MySubmissions
        user={user}
        goBack={() => setPage("dashboard")}
      />
    );
  }

  console.log(user);

  if (!user) {
    return <Login setUser={setUser} />;
  }

  if (page === "add") {
    return (
      <AddActivity
        user={user}
        goBack={() => setPage("dashboard")}
      />
    );
  }

 

  return (
    <Dashboard
      user={user}
      setUser={setUser}
      onClickAdd={() => setPage("add")}
      onClickSubmissions={() =>
        setPage("submissions")
      }
    />
  );
}

export default App;