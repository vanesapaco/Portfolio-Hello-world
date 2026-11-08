import type { BlogPost } from "./blog-data"

const PAGE_MARGIN = 18
const ACCENT: [number, number, number] = [124, 58, 237]

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

function hexToRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "")
  const num = parseInt(value.length === 3 ? value.replace(/./g, "$&$&") : value, 16)
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255]
}

async function loadImage(src: string) {
  const response = await fetch(src)
  const blob = await response.blob()
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
  const size = await new Promise<{ width: number; height: number }>((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight })
    img.onerror = reject
    img.src = dataUrl
  })
  return { dataUrl, ...size }
}

export async function downloadPostAsPdf(post: BlogPost) {
  const { jsPDF } = await import("jspdf")
  const doc = new jsPDF({ unit: "mm", format: "a4" })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const contentWidth = pageWidth - PAGE_MARGIN * 2
  let y = PAGE_MARGIN

  const ensureSpace = (needed: number) => {
    if (y + needed > pageHeight - PAGE_MARGIN) {
      doc.addPage()
      y = PAGE_MARGIN
    }
  }

  const writeText = (text: string, size: number, style: "normal" | "bold" | "italic", lineHeight = 1.5) => {
    doc.setFont("helvetica", style)
    doc.setFontSize(size)
    const lines = doc.splitTextToSize(text, contentWidth) as string[]
    const step = (size * 0.3528) * lineHeight
    for (const line of lines) {
      ensureSpace(step)
      doc.text(line, PAGE_MARGIN, y + step * 0.75)
      y += step
    }
  }

  const categoryColor = hexToRgb(post.categoryColor)
  doc.setFillColor(...categoryColor)
  doc.rect(0, 0, pageWidth, 4, "F")

  doc.setFont("helvetica", "bold")
  doc.setFontSize(9)
  doc.setTextColor(...categoryColor)
  doc.text(`#${String(post.id).padStart(3, "0")}  ·  ${post.category.trim().toUpperCase()}`, PAGE_MARGIN, y + 4)
  y += 10

  doc.setTextColor(20, 20, 30)
  writeText(post.title, 22, "bold", 1.25)
  y += 2

  const meta = [post.date, post.readTime].filter(Boolean).join("  ·  ")
  if (meta) {
    doc.setTextColor(110, 110, 120)
    writeText(meta, 10, "normal")
  }
  y += 4

  if (post.image) {
    try {
      const img = await loadImage(post.image)
      const imgHeight = Math.min((contentWidth * img.height) / img.width, 110)
      const imgWidth = (imgHeight * img.width) / img.height
      ensureSpace(imgHeight + 4)
      doc.addImage(img.dataUrl, PAGE_MARGIN + (contentWidth - imgWidth) / 2, y, imgWidth, imgHeight)
      y += imgHeight + 8
    } catch {
      y += 2
    }
  }

  doc.setTextColor(60, 60, 70)
  writeText(post.description, 12, "italic")
  y += 4
  doc.setDrawColor(220, 220, 230)
  doc.line(PAGE_MARGIN, y, pageWidth - PAGE_MARGIN, y)
  y += 8

  for (const block of post.content) {
    if (block.type === "heading") {
      y += 3
      doc.setTextColor(20, 20, 30)
      writeText(block.text, 15, "bold", 1.3)
      y += 2
    } else if (block.type === "paragraph") {
      doc.setTextColor(40, 40, 50)
      writeText(block.text, 11, "normal")
      y += 4
    } else if (block.type === "quote") {
      const startY = y
      doc.setTextColor(...ACCENT)
      writeText(`“${block.text}”`, 12, "italic")
      doc.setDrawColor(...ACCENT)
      doc.setLineWidth(0.8)
      doc.line(PAGE_MARGIN - 4, startY, PAGE_MARGIN - 4, y)
      doc.setLineWidth(0.2)
      y += 4
    } else if (block.type === "list") {
      doc.setTextColor(40, 40, 50)
      for (const item of block.items) writeText(`•  ${item}`, 11, "normal")
      y += 4
    }
  }

  if (post.tags?.length) {
    y += 2
    doc.setTextColor(110, 110, 120)
    writeText(post.tags.map((tag) => `#${tag}`).join("   "), 10, "normal")
  }

  if (post.originalUrl) {
    y += 4
    ensureSpace(8)
    doc.setFont("helvetica", "bold")
    doc.setFontSize(11)
    doc.setTextColor(...ACCENT)
    doc.textWithLink("Leer el post original", PAGE_MARGIN, y + 4, { url: post.originalUrl })
    y += 8
  }

  doc.save(`${slugify(post.title) || `post-${post.id}`}.pdf`)
}
