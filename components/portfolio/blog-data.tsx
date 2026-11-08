import { BookOpen, Lightbulb, TrendingUp, Sparkles, Code, Gamepad2, GraduationCap, Users } from "lucide-react"

export type BlogBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }

export interface BlogPost {
  id: number
  title: string
  description: string
  category: string
  categoryIcon: React.ReactNode
  categoryColor: string
  image?: string
  imageAlt?: string
  date?: string
  readTime?: string
  originalUrl?: string
  tags?: string[]
  content: BlogBlock[]
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Orquestación de Agentes con arquetipos y frameworks en Kiro",
    description:
      "En el Meet up de “Orquestación de agentes con arquetipos y frameworks de marketing y los llevamos al ecosistema de AWS.",
    image: "/images/orquestacion-agentes.jpg",
    imageAlt:
      "Foto grupal del meetup Orquestación de agentes con el arquetipo Dream Team en el Centro de Innovación",
    category: "AWS User Group",
    categoryIcon: <Lightbulb className="h-4 w-4" />,
    categoryColor: "#14b8a6",
    tags: ["AWS", "Kiro", "Agentes IA", "Marketing"],
    content: [
      {
        type: "paragraph",
        text: "En el Meet up de “Orquestación de agentes con arquetipos y frameworks de marketing y los llevamos al ecosistema de AWS.",
      },
    ],
  },
  {
    id: 2,
    title: "Herramientas para el profesional del futuro",
    description:
      "Análisis del caos controlado: cómo el carácter del búho verde rompió todos los manuales de marca y ganó.",
    image: "/images/herramientas-profesional.jpg",
    imageAlt:
      "Charla Herramientas para el profesional del futuro ante estudiantes en el auditorio de la Universidad UCATEC con AIESEC",
    category: "AIESEC",
    categoryIcon: <TrendingUp className="h-4 w-4" />,
    categoryColor: "#06b6d4",
    tags: ["AIESEC", "Carrera", "Herramientas"],
    content: [
      {
        type: "paragraph",
        text: "Análisis del caos controlado: cómo el carácter del búho verde rompió todos los manuales de marca y ganó.",
      },
    ],
  },
  {
    id: 3,
    title: "La falacia de la automatización",
    description:
      "Se creía que la era de la #automatización liberaría a las personas para que puedan dedicarse a actividades como escribir poesía, componer música, dibujar y explorar otras formas de expresión artística.",
    category: "Feria del Libro ",
    categoryIcon: <BookOpen className="h-4 w-4" />,
    categoryColor: "#7c3aed",
    image: "/images/falacia-automatizacion.png",
    imageAlt: "Presentando la charla La falacia de la automatización frente a una diapositiva que pregunta ¿Realidad?",
    tags: ["Automatización", "IA", "Creatividad"],
    content: [
      {
        type: "paragraph",
        text: "Se creía que la era de la #automatización liberaría a las personas para que puedan dedicarse a actividades como escribir poesía, componer música, dibujar y explorar otras formas de expresión artística.",
      },
    ],
  },
  {
    id: 4,
    title: "PyDay Cochabamba",
    description:
      "Mi experiencia en el PyDay Cochabamba: una jornada de charlas, talleres y comunidad alrededor de Python, datos e inteligencia artificial.",
    category: "Python Bolivia",
    categoryIcon: <Code className="h-4 w-4" />,
    categoryColor: "#0ea5e9",
    image: "/images/pyday-cochabamba.jpg",
    imageAlt:
      "Foto grupal de organizadores y asistentes del PyDay Cochabamba junto a banners de PyLadies y Python Cochabamba en la Universidad UCATEC",
    tags: ["Python", "Comunidad", "PyLadies"],
    content: [
      {
        type: "paragraph",
        text: "Mi experiencia en el PyDay Cochabamba: una jornada de charlas, talleres y comunidad alrededor de Python, datos e inteligencia artificial.",
      },
    ],
  },
  {
    id: 5,
    title: "3 años de la Women Game Jam",
    description:
      "Tres ediciones creando videojuegos junto a mujeres y diversidades: lo que aprendimos organizando, diseñando y construyendo comunidad.",
    category: "Women Game Jam",
    categoryIcon: <Gamepad2 className="h-4 w-4" />,
    categoryColor: "#ec4899",
    image: "/images/women-game-jam.jpg",
    imageAlt:
      "Equipo organizador de la Women Game Jam con coronas de papel junto a vasos morados WGJ en la mesa de registro",
    tags: ["Videojuegos", "Diversidad", "Comunidad"],
    content: [
      {
        type: "paragraph",
        text: "Tres ediciones creando videojuegos junto a mujeres y diversidades: lo que aprendimos organizando, diseñando y construyendo comunidad.",
      },
    ],
  },
  {
    id: 6,
    title: "Platzi AI Academy y los retos",
    description:
      "Cómo viví los retos de Platzi AI Academy: aprendizaje práctico, proyectos con IA generativa y oportunidades para empezar en tecnología.",
    category: "Platzi",
    categoryIcon: <GraduationCap className="h-4 w-4" />,
    categoryColor: "#22c55e",
    image: "/images/platzi-live.png",
    imageAlt:
      "Transmisión en vivo de Platzi con el host frente a un micrófono Platzi y tres participantes en videollamada",
    tags: ["Platzi", "IA Generativa", "Aprendizaje"],
    content: [
      {
        type: "paragraph",
        text: "Cómo viví los retos de Platzi AI Academy: aprendizaje práctico, proyectos con IA generativa y oportunidades para empezar en tecnología.",
      },
    ],
  },
  {
    id: 7,
    title: "Team Marketing en diferentes versiones",
    description:
      "Los equipos de marketing con los que he crecido: distintas etapas, formas de trabajar y proyectos que construimos juntos.",
    category: "Digital Harbor",
    categoryIcon: <Users className="h-4 w-4" />,
    categoryColor: "#a855f7",
    image: "/images/team-marketing.jpg",
    imageAlt:
      "Equipo de marketing de Digital Harbor haciendo gestos con las manos detrás de bolsas de regalo personalizadas",
    tags: ["Marketing", "Equipos", "Digital Harbor"],
    content: [
      {
        type: "paragraph",
        text: "Los equipos de marketing con los que he crecido: distintas etapas, formas de trabajar y proyectos que construimos juntos.",
      },
    ],
  },
  {
    id: 8,
    title: "¿Qué hace un Media Partner en el EMMS?",
    description:
      "Ser partner oficial permitió regalar una asesoría personalizada y un curso creativo de Domestika a la comunidad.",
    category: "EMMS Hostinger x Doppler",
    categoryIcon: <Sparkles className="h-4 w-4" />,
    categoryColor: "#f59e0b",
    image: "/images/emms-partners.png",
    imageAlt: "Sitio web del EMMS by Doppler mostrando la sección Media Partners Starters con los logos de los partners",
    tags: ["EMMS", "Media Partner", "Comunidad"],
    content: [
      {
        type: "paragraph",
        text: "Ser partner oficial permitió regalar una asesoría personalizada y un curso creativo de Domestika a la comunidad.",
      },
    ],
  },
]
