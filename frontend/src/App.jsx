// Importing necessary libraries and components
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom"
import { useContext } from "react"

import Login from "./pages/Auth/Login"
import SignUp from "./pages/Auth/SignUp"

import Dashboard from "./pages/Admin/Dashboard"
import ManageUsers from "./pages/Admin/ManageUsers"
import ManageTasks from "./pages/Admin/ManageTasks"
import CreateTask from "./pages/Admin/CreateTask"

import MyTasks from "./pages/User/MyTasks"
import UserDashboard from "./pages/User/UserDashboard"
import ViewTaskDetails from "./pages/User/ViewTaskDetails"

import PrivateRoute from "./routes/PrivateRoute"
import UserProvider, { UserContext } from "./context/userContext"


const App = () => {
  return (
    <UserProvider>

      <div>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Admin Routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/tasks" element={<ManageTasks />} />
              <Route path="/admin/create-task" element={<CreateTask />} />
            </Route>

            {/* User Routes */}
            <Route element={<PrivateRoute allowedRoles={["user"]} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/tasks" element={<MyTasks />} />
              <Route path="/user/task-details/:id" element={<ViewTaskDetails />} />
            </Route>

            {/* Default Route */}
            <Route path="/" element={<Root />} />


          </Routes>
        </Router>

      </div>
    </UserProvider>
  )
}

export default App

const Root = () => {
  const {user, loading} = useContext(UserContext);

  if(loading) return <Outlet />

  if(!user) return <Navigate to='/login' />


  return user.role === 'admin'? <Navigate to='/admin/dashboard' /> : <Navigate to='/user/dashboard' />;
};