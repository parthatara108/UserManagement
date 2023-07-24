import { BrowserRouter, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import UserForm from "./components/UserForm"

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/user-form/" element={<UserForm />} />
          <Route path="/user-form/:id" element={<UserForm />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
