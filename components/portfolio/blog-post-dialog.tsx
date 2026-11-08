"use client"

import { useState } from "react"
import NextImage from "next/image"
import { CalendarDays, Clock, Download, ExternalLink, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import type { BlogBlock, BlogPost } from "./blog-data"
import { downloadPostAsPdf } from "./blog-pdf"

function BlogBlockView({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case "heading":
      return <h3 className="text-xl font-bold text-foreground mt-4">{block.text}</h3>
    case "quote":
      return (
        <blockquote className="border-l-4 border-primary pl-4 py-1 font-serif italic text-lg text-foreground/90">
          {block.text}
        </blockquote>
      )
    case "list":
      return (
        <ul className="list-disc pl-5 flex flex-col gap-1.5 marker:text-primary">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    default:
      return <p>{block.text}</p>
  }
}

interface BlogPostDialogProps {
  post: BlogPost | null
  onOpenChange: (open: boolean) => void
}

export function BlogPostDialog({ post, onOpenChange }: BlogPostDialogProps) {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    if (!post) return
    setIsDownloading(true)
    try {
      await downloadPostAsPdf(post)
    } finally {
      setIsDownloading(false)
    }
  }

  return (
    <Dialog open={post !== null} onOpenChange={onOpenChange}>
      <DialogContent className="p-0 gap-0 sm:max-w-3xl max-h-[90vh] overflow-hidden flex flex-col border-2 border-primary/30 rounded-2xl">
        {post && (
          <>
            <div className="overflow-y-auto">
              {post.image ? (
                <div className="relative aspect-[16/8] w-full bg-muted">
                  <NextImage
                    src={post.image}
                    alt={post.imageAlt ?? post.title}
                    fill
                    sizes="(min-width: 768px) 768px, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
              ) : (
                <div
                  className="h-32 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${post.categoryColor}25 0%, ${post.categoryColor}08 100%)` }}
                >
                  <span className="[&_svg]:h-12 [&_svg]:w-12" style={{ color: post.categoryColor }}>
                    {post.categoryIcon}
                  </span>
                </div>
              )}

              <article className="px-6 py-6 md:px-10 md:py-8 flex flex-col gap-6">
                <header className="flex flex-col gap-3">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                    <span className="text-primary font-bold">#{String(post.id).padStart(3, "0")}</span>
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-semibold"
                      style={{ backgroundColor: `${post.categoryColor}1f`, color: post.categoryColor }}
                    >
                      {post.categoryIcon}
                      {post.category.trim()}
                    </span>
                  </div>

                  <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight text-balance text-foreground">
                    {post.title}
                  </DialogTitle>

                  {(post.date || post.readTime) && (
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      {post.date && (
                        <span className="inline-flex items-center gap-1.5">
                          <CalendarDays className="h-4 w-4" aria-hidden="true" />
                          {post.date}
                        </span>
                      )}
                      {post.readTime && (
                        <span className="inline-flex items-center gap-1.5">
                          <Clock className="h-4 w-4" aria-hidden="true" />
                          {post.readTime}
                        </span>
                      )}
                    </div>
                  )}

                  <DialogDescription className="text-base md:text-lg text-muted-foreground leading-relaxed text-pretty">
                    {post.description}
                  </DialogDescription>
                </header>

                <hr className="border-primary/20" />

                <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/85">
                  {post.content.map((block, index) => (
                    <BlogBlockView key={index} block={block} />
                  ))}
                </div>

                {post.tags && post.tags.length > 0 && (
                  <ul className="flex flex-wrap gap-2" aria-label="Etiquetas">
                    {post.tags.map((tag) => (
                      <li key={tag} className="rounded-full border border-primary/30 px-3 py-1 text-xs font-mono text-primary">
                        #{tag}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </div>

            <footer className="flex flex-col-reverse sm:flex-row gap-3 sm:justify-end border-t border-primary/20 bg-card px-6 py-4">
              <button
                type="button"
                onClick={handleDownload}
                disabled={isDownloading}
                className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary/40 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary/10 disabled:opacity-60"
              >
                {isDownloading ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Download className="h-4 w-4" aria-hidden="true" />
                )}
                {isDownloading ? "Generando PDF..." : "Descargar nota (PDF)"}
              </button>

              {post.originalUrl ? (
                <a
                  href={post.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:shadow-md"
                  style={{ backgroundColor: "#7c3aed" }}
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Ir al post original
                </a>
              ) : (
                <span
                  aria-disabled="true"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-muted px-4 py-2 text-sm font-semibold text-muted-foreground cursor-not-allowed"
                >
                  <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  Post original próximamente
                </span>
              )}
            </footer>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
