import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Agentation } from "agentation"
import { Dashboard } from "@/pages/dashboard"
import { DocFeedbackTriage } from "@/pages/DocFeedbackTriage"
import { DocsHealthDashboard } from "@/pages/DocsHealthDashboard"
import { ProductDetail } from "@/pages/ProductDetail"
import { InsightDetail } from "@/pages/InsightDetail"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DocsHealthDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doc-feedback" element={<DocFeedbackTriage />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/product/:slug/insight/:insightId" element={<InsightDetail />} />
      </Routes>
      {import.meta.env.DEV && <Agentation endpoint="/agentation" />}
    </BrowserRouter>
  )
}

export default App
