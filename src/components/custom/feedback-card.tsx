import { RiStarFill, RiStarLine } from "@remixicon/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { FeedbackEntry, Sentiment } from "@/data/mock-feedback"

const sentimentLabel: Record<Sentiment, string> = {
  positive: "Positive",
  neutral: "Neutral",
  negative: "Negative",
}

// Solid bg + foreground text — extracted from Figma badge selection via MCP.
// success:     #CBF58A bg / #375500 text  (nvidia-green/200 + /800)
// secondary:   #F5F5F5 bg / #0A0A0A text  (neutral/100 + /950)
// destructive: #FECACA bg / #B91C1C text  (red/200 + red/700)
// Shape: radius-lg = 10px → pill at badge height; rounded-full achieves same.
const sentimentClass: Record<Sentiment, string> = {
  positive: "bg-success text-success-foreground border-transparent rounded-full",
  neutral:  "rounded-full",
  negative: "bg-destructive text-destructive-foreground border-transparent rounded-full",
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) =>
        i < rating ? (
          <RiStarFill key={i} className="size-3.5 text-foreground" />
        ) : (
          <RiStarLine key={i} className="size-3.5 text-muted-foreground" />
        )
      )}
    </div>
  )
}

interface FeedbackCardProps {
  feedback: FeedbackEntry
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar size="sm">
            <AvatarFallback>{feedback.avatarFallback}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <CardTitle className="text-sm">{feedback.customerName}</CardTitle>
            <CardDescription className="text-xs">{feedback.date}</CardDescription>
          </div>
        </div>
        <CardAction>
          <Badge
            variant="secondary"
            className={sentimentClass[feedback.sentiment]}
          >
            {sentimentLabel[feedback.sentiment]}
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <StarRating rating={feedback.rating} />
        <p className="text-sm text-card-foreground">{feedback.feedbackText}</p>
      </CardContent>
    </Card>
  )
}
