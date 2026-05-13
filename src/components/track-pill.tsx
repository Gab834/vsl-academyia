import { cn } from "@/lib/utils"
import type { Track } from "@/types"

interface TrackPillProps {
  track: Track
  active?: boolean
  onClick?: () => void
}

export function TrackPill({ track, active, onClick }: TrackPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full px-4 py-1.5 text-sm transition-colors whitespace-nowrap",
        active
          ? "bg-card border border-border text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {track.title}
    </button>
  )
}
