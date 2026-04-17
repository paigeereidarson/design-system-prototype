import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/hooks/use-theme"
import { setSubscribedProductIds } from "@/hooks/use-subscribed-products"
import logoLight from "@/assets/docs-health-lm.png"
import logoDark from "@/assets/docs-health-dm.png"

// --- All available products for selection ---
const availableProducts = [
  // Compute
  { id: "cuda", name: "CUDA", category: "Compute", pages: 847, visitors: "284K /wk" },
  { id: "cuda-x", name: "CUDA-X", category: "Compute", pages: 214, visitors: "18.3K /wk" },
  { id: "hpc-sdk", name: "HPC SDK", category: "Compute", pages: 326, visitors: "11.7K /wk" },
  // Cloud Services
  { id: "dgx-cloud", name: "DGX Cloud", category: "Cloud Services", pages: 312, visitors: "12.6K /wk" },
  { id: "base-command", name: "Base Command", category: "Cloud Services", pages: 187, visitors: "6.2K /wk" },
  { id: "fleet-command", name: "Fleet Command", category: "Cloud Services", pages: 143, visitors: "3.8K /wk" },
  // AI & Healthcare
  { id: "bionemo", name: "BioNeMo", category: "AI & Healthcare", pages: 89, visitors: "1.1K /wk" },
  { id: "clara", name: "Clara", category: "AI & Healthcare", pages: 256, visitors: "7.4K /wk" },
  { id: "monai", name: "MONAI", category: "AI & Healthcare", pages: 178, visitors: "4.9K /wk" },
  // AI Frameworks
  { id: "nemo-llm", name: "NeMo LLM", category: "AI Frameworks", pages: 421, visitors: "67.5K /wk" },
  { id: "nemo-framework", name: "NeMo Framework", category: "AI Frameworks", pages: 283, visitors: "18.1K /wk" },
  { id: "megatron", name: "Megatron", category: "AI Frameworks", pages: 152, visitors: "22.4K /wk" },
  // Inference
  { id: "tensorrt", name: "TensorRT", category: "Inference", pages: 634, visitors: "41.2K /wk" },
  { id: "triton", name: "Triton Inference Server", category: "Inference", pages: 516, visitors: "22.7K /wk" },
  { id: "tensorrt-llm", name: "TensorRT-LLM", category: "Inference", pages: 298, visitors: "35.6K /wk" },
  // Edge & Video
  { id: "deepstream", name: "DeepStream SDK", category: "Edge & Video", pages: 278, visitors: "8.4K /wk" },
  { id: "metropolis", name: "Metropolis", category: "Edge & Video", pages: 194, visitors: "5.1K /wk" },
  { id: "jetpack", name: "JetPack SDK", category: "Edge & Video", pages: 412, visitors: "14.8K /wk" },
  // Data Science
  { id: "rapids", name: "RAPIDS", category: "Data Science", pages: 392, visitors: "15.3K /wk" },
  { id: "dali", name: "DALI", category: "Data Science", pages: 167, visitors: "6.7K /wk" },
  { id: "cudf", name: "cuDF", category: "Data Science", pages: 203, visitors: "8.2K /wk" },
  // Simulation & Robotics
  { id: "omniverse", name: "Omniverse", category: "Simulation & Robotics", pages: 1204, visitors: "31.8K /wk" },
  { id: "isaac-sim", name: "Isaac Sim", category: "Simulation & Robotics", pages: 347, visitors: "9.6K /wk" },
  { id: "drive-sim", name: "DRIVE Sim", category: "Simulation & Robotics", pages: 231, visitors: "4.3K /wk" },
  // Autonomous
  { id: "drive-agx", name: "DRIVE AGX", category: "Autonomous", pages: 198, visitors: "5.7K /wk" },
  { id: "drive-os", name: "DRIVE OS", category: "Autonomous", pages: 276, visitors: "3.9K /wk" },
  { id: "driveworks", name: "DriveWorks SDK", category: "Autonomous", pages: 341, visitors: "6.1K /wk" },
]

export function Onboarding() {
  const navigate = useNavigate()
  const { theme } = useTheme()
  const [step, setStep] = useState<1 | 2>(1)
  const [selected, setSelected] = useState<Set<string>>(new Set(["cuda", "dgx-cloud", "bionemo"]))
  const [search, setSearch] = useState("")
  const [transitioning, setTransitioning] = useState(false)

  function toggle(id: string) {
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function finish() {
    setSubscribedProductIds([...selected])
    setTransitioning(true)
    setTimeout(() => navigate("/my-products"), 3500)
  }

  const filtered = availableProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  )

  const categories = [...new Set(filtered.map(p => p.category))]

  if (transitioning) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-6 animate-fade-in">
          <img
            src={theme === "nvidia-light" ? logoLight : logoDark}
            alt="docs.health"
            style={{ height: 32 }}
            className="animate-pulse"
          />
          <p className="text-sm text-muted-foreground animate-fade-in-delayed">
            Building your dashboard...
          </p>
        </div>
        <style>{`
          @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes fadeInDelayed { from { opacity: 0; } to { opacity: 1; } }
          .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
          .animate-fade-in-delayed { animation: fadeInDelayed 0.6s ease-out 0.3s forwards; opacity: 0; }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-8 py-4 border-b border-border">
        <img src={theme === "nvidia-light" ? logoLight : logoDark} alt="docs.health" style={{ height: 24 }} />
        <p className="text-xs text-muted-foreground">Setup · Step {step} of 2</p>
      </header>

      {/* Content */}
      <main className="flex-1 flex items-start justify-center pt-16 px-6">
        <div className="w-full max-w-2xl">
          {step === 1 && (
            <div className="flex flex-col gap-8">
              {/* Welcome */}
              <h1 className="text-title font-semibold text-foreground">
                Which products do you want to track?
              </h1>

              {/* Search */}
              <div className="relative">
                <i className="ri-search-line pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" style={{ fontSize: "16px" }} />
                <Input
                  placeholder="Search products..."
                  className="pl-9"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* Product grid by category */}
              <div className="flex flex-col gap-6">
                {categories.map(cat => (
                  <div key={cat}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2">{cat}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {filtered.filter(p => p.category === cat).map(product => {
                        const isSelected = selected.has(product.id)
                        return (
                          <button
                            key={product.id}
                            onClick={() => toggle(product.id)}
                            className={`flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-all ${
                              isSelected
                                ? "border-primary bg-primary/5 ring-1 ring-primary"
                                : "border-border hover:border-muted-foreground"
                            }`}
                          >
                            <div className={`flex items-center justify-center size-5 rounded-sm border transition-colors ${
                              isSelected ? "bg-primary border-primary" : "border-muted-foreground"
                            }`}>
                              {isSelected && <i className="ri-check-line text-primary-foreground" style={{ fontSize: "12px" }} />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground">{product.name}</p>
                              <p className="text-xs text-foreground">{product.pages} pages · {product.visitors}</p>
                            </div>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between py-4 border-t border-border sticky bottom-0 bg-background">
                <p className="text-sm text-muted-foreground">
                  {selected.size === 0 ? "No products selected" : `${selected.size} product${selected.size > 1 ? "s" : ""} selected`}
                </p>
                <Button
                  variant="default"
                  onClick={() => setStep(2)}
                  disabled={selected.size === 0}
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-3">
                <h1 className="text-title font-semibold text-foreground">
                  You're all set
                </h1>
                <p className="text-sm text-muted-foreground">
                  docs.health will now track these {selected.size} products. Here's what to expect on your dashboard.
                </p>
              </div>

              {/* Selected products summary */}
              <Card>
                <CardContent>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">Your Products</p>
                  <div className="flex flex-wrap gap-2">
                    {[...selected].map(id => {
                      const p = availableProducts.find(x => x.id === id)
                      return p ? (
                        <Badge key={id} variant="outline" className="text-sm py-1 px-3">
                          {p.name}
                        </Badge>
                      ) : null
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* What you'll see */}
              <div className="flex flex-col gap-6">
                <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">What happens next</p>
                {[
                  { icon: "ri-lightbulb-line", title: "Top 5 actions", desc: "Every week, the system identifies the five highest-impact things you can do across your products." },
                  { icon: "ri-pulse-line", title: "Health scores", desc: "Each product gets an overall health score based on traffic, feedback, errors, and content freshness." },
                  { icon: "ri-notification-3-line", title: "Trend alerts", desc: "When a metric moves significantly — up or down — you'll see it flagged on your dashboard." },
                ].map(item => (
                  <div key={item.title} className="flex gap-4 items-start">
                    <div className="flex items-center justify-center size-10 rounded-lg bg-secondary shrink-0">
                      <i className={item.icon} style={{ fontSize: "20px" }} />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-heading-sm font-semibold text-foreground">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between py-6 border-t border-border">
                <button
                  onClick={() => setStep(1)}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← Back to product selection
                </button>
                <Button variant="default" onClick={finish}>
                  Go to dashboard
                  <i className="ri-arrow-right-line" style={{ fontSize: "14px" }} />
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
