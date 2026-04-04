import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashboard } from "@/pages/dashboard"
import { DocFeedbackTriage } from "@/pages/DocFeedbackTriage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/doc-feedback" element={<DocFeedbackTriage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
