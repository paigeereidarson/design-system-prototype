export type Sentiment = "positive" | "neutral" | "negative"

export interface FeedbackEntry {
  id: string
  customerName: string
  avatarFallback: string
  rating: number
  feedbackText: string
  date: string
  sentiment: Sentiment
  category: string
}

export const feedbackData: FeedbackEntry[] = [
  {
    id: "1",
    customerName: "Sarah Chen",
    avatarFallback: "SC",
    rating: 5,
    feedbackText: "The onboarding flow was incredibly smooth. I was up and running in under 5 minutes. Love the clean interface.",
    date: "2026-03-28",
    sentiment: "positive",
    category: "Onboarding",
  },
  {
    id: "2",
    customerName: "Marcus Johnson",
    avatarFallback: "MJ",
    rating: 2,
    feedbackText: "Dashboard takes too long to load when filtering by date range. Had to wait over 10 seconds each time.",
    date: "2026-03-27",
    sentiment: "negative",
    category: "Performance",
  },
  {
    id: "3",
    customerName: "Priya Patel",
    avatarFallback: "PP",
    rating: 4,
    feedbackText: "Really appreciate the new export feature. Would be great to add CSV support alongside PDF.",
    date: "2026-03-27",
    sentiment: "positive",
    category: "Features",
  },
  {
    id: "4",
    customerName: "Tom Erikson",
    avatarFallback: "TE",
    rating: 3,
    feedbackText: "The product works fine for basic use cases. Nothing particularly stands out but it gets the job done.",
    date: "2026-03-26",
    sentiment: "neutral",
    category: "General",
  },
  {
    id: "5",
    customerName: "Aisha Rahman",
    avatarFallback: "AR",
    rating: 5,
    feedbackText: "Customer support resolved my issue within an hour. The team really goes above and beyond.",
    date: "2026-03-26",
    sentiment: "positive",
    category: "Support",
  },
  {
    id: "6",
    customerName: "David Kim",
    avatarFallback: "DK",
    rating: 1,
    feedbackText: "Lost all my saved settings after the last update. No warning, no backup option. Very frustrating.",
    date: "2026-03-25",
    sentiment: "negative",
    category: "Bugs",
  },
  {
    id: "7",
    customerName: "Elena Vasquez",
    avatarFallback: "EV",
    rating: 4,
    feedbackText: "The collaboration features make it easy to work with my team. Real-time editing is a game changer.",
    date: "2026-03-25",
    sentiment: "positive",
    category: "Features",
  },
  {
    id: "8",
    customerName: "James Wright",
    avatarFallback: "JW",
    rating: 3,
    feedbackText: "Pricing is reasonable for what you get. Would love to see a starter plan for smaller teams.",
    date: "2026-03-24",
    sentiment: "neutral",
    category: "Pricing",
  },
  {
    id: "9",
    customerName: "Mei Lin",
    avatarFallback: "ML",
    rating: 5,
    feedbackText: "Switched from a competitor last month. The API documentation is so much better. Integration took half the time.",
    date: "2026-03-24",
    sentiment: "positive",
    category: "Documentation",
  },
  {
    id: "10",
    customerName: "Oliver Nash",
    avatarFallback: "ON",
    rating: 2,
    feedbackText: "Mobile experience needs work. Buttons are too small and the navigation is confusing on smaller screens.",
    date: "2026-03-23",
    sentiment: "negative",
    category: "Mobile",
  },
  {
    id: "11",
    customerName: "Fatima Al-Rashid",
    avatarFallback: "FA",
    rating: 4,
    feedbackText: "The analytics dashboard gives me exactly the insights I need. Charts are clear and easy to understand.",
    date: "2026-03-23",
    sentiment: "positive",
    category: "Analytics",
  },
  {
    id: "12",
    customerName: "Ryan O'Connor",
    avatarFallback: "RO",
    rating: 3,
    feedbackText: "Decent product overall. Some features feel half-baked but I can see the potential. Looking forward to updates.",
    date: "2026-03-22",
    sentiment: "neutral",
    category: "General",
  },
]

export const stats = {
  totalFeedback: feedbackData.length,
  averageRating: Number((feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length).toFixed(1)),
  positiveRate: Math.round((feedbackData.filter((f) => f.sentiment === "positive").length / feedbackData.length) * 100),
  responseRate: 94,
}
