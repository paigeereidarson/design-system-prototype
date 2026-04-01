import { Star } from "@phosphor-icons/react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardAction } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import type { FeedbackEntry, Sentiment } from "@/data/mock-feedback"

const sentimentVariant: Record<Sentiment, "default" | "secondary" | "destructive"> = {
  positive: "default",
  neutral: "secondary",
  negative: "destructive",
}

const sentimentLabel: Record<Sentiment, string> = {
  positive: "Positive",
  neutral: "Neutral",
  negative: "Negative",
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          weight={i < rating ? "fill" : "regular"}
          className={`size-3.5 ${i < rating ? "text-foreground" : "text-muted-foreground"}`}
        />
      ))}
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
          <Badge variant={sentimentVariant[feedback.sentiment]}>
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
