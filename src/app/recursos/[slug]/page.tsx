import { notFound } from "next/navigation"
import Link from "next/link"
import { Download, FileText, ChevronRight } from "lucide-react"
import { supabaseAdmin } from "@/lib/supabase"

export const revalidate = 0

interface Props {
  params: Promise<{ slug: string }>
}

export default async function RecursoPage({ params }: Props) {
  const { slug } = await params
  const { data: resource } = await supabaseAdmin
    .from("resources")
    .select("*")
    .eq("slug", slug)
    .single()

  if (!resource) notFound()

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <nav className="flex items-center gap-1.5 text-sm text-muted-foreground mb-6">
        <Link href="/recursos" className="hover:text-foreground transition-colors">Recursos</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-foreground line-clamp-1">{resource.title}</span>
      </nav>

      <h1 className="text-2xl font-semibold mb-3">{resource.title}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {(resource.tags ?? []).map((tag: string) => (
          <span key={tag} className="text-xs px-2.5 py-1 rounded-full border border-border text-muted-foreground">{tag}</span>
        ))}
      </div>

      <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-gradient-to-br from-neutral-800 to-neutral-900">
        {resource.cover_image_url && (
          <img src={resource.cover_image_url} alt={resource.title} className="w-full h-full object-cover" />
        )}
      </div>

      <div className="flex items-center justify-between p-4 bg-card border border-border rounded-xl mb-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-[var(--epic-teal-dim)] flex items-center justify-center">
            <FileText className="w-4 h-4 text-[var(--epic-teal)]" />
          </div>
          <span className="text-sm font-medium">{resource.title}</span>
        </div>
        {resource.download_url ? (
          <a
            href={resource.download_url}
            download
            className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium rounded-lg hover:bg-foreground/90 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Download
          </a>
        ) : (
          <span className="text-xs text-muted-foreground">Em breve</span>
        )}
      </div>

      {resource.description && (
        <div>
          <h2 className="text-base font-semibold mb-3">Sobre este recurso</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">{resource.description}</p>
        </div>
      )}
    </div>
  )
}
