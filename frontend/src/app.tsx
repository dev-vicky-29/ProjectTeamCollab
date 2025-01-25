import type React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { NotificationProvider } from "./contexts/NotificationContext"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import NewProject from "./pages/NewProject"
import ProjectDetails from "./pages/ProjectDetails"
import Search from "./pages/Search"
import UserProfile from "./pages/UserProfile"

const App: React.FC = () => {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/projects/new" component={NewProject} />
              <Route path="/projects/:id" component={ProjectDetails} />
              <Route path="/search" component={Search} />
              <Route path="/users/:id" component={UserProfile} />
            </Switch>
          </div>
        </Router>
      </NotificationProvider>
    </AuthProvider>
  )
}

export default App

