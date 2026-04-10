import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Agentation } from "agentation"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { AppLayout } from "@/components/layout/AppLayout"
import { Home } from "@/pages/Home"

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
        <Toaster />
      </TooltipProvider>
      {import.meta.env.DEV && <Agentation endpoint="/agentation" />}
    </BrowserRouter>
  )
}

export default App
