import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Agentation } from "agentation"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { AppLayout } from "@/components/layout/AppLayout"
import { Home } from "@/pages/Home"
import { MyProducts } from "@/pages/MyProducts"
import { Playground } from "@/pages/Playground"
import { ProductDetail } from "@/pages/ProductDetail"
import { DocPageDetail } from "@/pages/DocPageDetail"
import { Onboarding } from "@/pages/Onboarding"

function App() {
  return (
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route element={<AppLayout />}>
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/all-products" element={<Home />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/products/:id/pages/:pageId" element={<DocPageDetail />} />
          </Route>
        </Routes>
        <Toaster />
      </TooltipProvider>
      {import.meta.env.DEV && <Agentation endpoint="/agentation" />}
    </BrowserRouter>
  )
}

export default App
