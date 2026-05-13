"use client"

import Link from "next/link"
import { Lock } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Lesson } from "@/types"

interface LessonCardProps {
  lesson: Lesson
  className?: string
}

export function LessonCard({ lesson, className }: LessonCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <Link
      href={`/aulas/${lesson.slug}`}
      className={cn(
        "group block rounded-xl overflow-hidden bg-card border border-border hover:border-border/60 hover:bg-[var(--epic-card-hover)] transition-all",
        className
      )}
    >
      <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900">
        {lesson.coverImage && !imgError ? (
          <img
            src={lesson.coverImage}
            alt={lesson.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

        {lesson.locked && (
          <div className="absolute top-2 right-2">
            <Lock className="w-3.5 h-3.5 text-white drop-shadow" />
          </div>
        )}

        {lesson.duration && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded font-medium">
            {lesson.duration}
          </div>
        )}
      </div>

      <div className="p-3">
        <p className={cn("text-sm font-medium line-clamp-2 mb-2 leading-snug", lesson.locked && "text-foreground/80")}>
          {lesson.title}
        </p>
        <span className="text-xs text-muted-foreground">Class</span>
      </div>
    </Link>
  )
}
