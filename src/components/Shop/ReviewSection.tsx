import { Star, ThumbsUp } from "lucide-react"

export default function ReviewsSection() {
  const reviews = [
    {
      id: 1,
      author: "Marcus Johnson",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      title: "Exceptional Quality",
      content:
        "The jersey exceeded my expectations. The fit is perfect, and the material feels premium. Highly recommend!",
      helpful: 234,
    },
    {
      id: 2,
      author: "Sarah Williams",
      rating: 5,
      date: "1 month ago",
      verified: true,
      title: "Perfect for Performance",
      content: "Wore this for my competitive match and it performed flawlessly. Great breathability and comfort.",
      helpful: 156,
    },
    {
      id: 3,
      author: "James Chen",
      rating: 4,
      date: "1 month ago",
      verified: true,
      title: "Great Jersey, Minor Issue",
      content: "Love the jersey overall. Only minor issue is the color faded slightly after first wash.",
      helpful: 89,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 border-t border-border">
      <h2 className="text-3xl font-bold mb-12">Customer Reviews</h2>

      <div className="grid md:grid-cols-3 gap-8 mb-12">
        {/* Rating Summary */}
        <div className="bg-secondary p-8 rounded-lg">
          <div className="flex items-end gap-3 mb-4">
            <div className="text-5xl font-bold">4.9</div>
            <div className="text-muted-foreground">/5</div>
          </div>
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-current text-accent" />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">Based on 248 verified reviews</p>
        </div>

        {/* Rating Breakdown */}
        <div className="md:col-span-2 space-y-3">
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm font-medium w-12">{stars} stars</span>
              <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent rounded-full"
                  style={{ width: `${stars === 5 ? 85 : stars === 4 ? 12 : stars === 3 ? 2 : 1}%` }}
                />
              </div>
              <span className="text-sm text-muted-foreground w-12 text-right">
                {stars === 5 ? "210" : stars === 4 ? "30" : stars === 3 ? "5" : "3"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="pb-6 border-b border-border">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="font-semibold">{review.author}</div>
                  {review.verified && (
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? "fill-current text-accent" : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">{review.date}</span>
                </div>
              </div>
            </div>

            <h4 className="font-semibold mb-2">{review.title}</h4>
            <p className="text-muted-foreground mb-4">{review.content}</p>

            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition">
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful ({review.helpful})</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
