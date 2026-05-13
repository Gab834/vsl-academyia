"use client"

import Link from "next/link"
import { Download, FileText } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import type { Resource } from "@/types"

interface ResourceCardProps {
  resource: Resource
  className?: string
}

export function ResourceCard({ resource, className }: ResourceCardProps) {
  const [imgError, setImgError] = useState(false)

  return (
    <Link
      href={`/recursos/${resource.slug}`}
      className={cn(
        "group block rounded-xl overflow-hidden bg-card border border-border hover:border-border/60 hover:bg-[var(--epic-card-hover)] transition-all",
        className
      )}
    >
      <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-neutral-800 to-neutral-900">
        {resource.coverImage && !imgError ? (
          <img
            src={resource.coverImage}
            alt={resource.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FileText className="w-8 h-8 text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Download className="w-5 h-5 text-white drop-shadow" />
        </div>
      </div>

      <div className="p-3">
        <p className="text-sm font-medium line-clamp-2 mb-2 leading-snug">{resource.title}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Recurso</span>
          <FileText className="w-3.5 h-3.5 text-muted-foreground" />
        </div>
      </div>
    </Link>
  )
}
