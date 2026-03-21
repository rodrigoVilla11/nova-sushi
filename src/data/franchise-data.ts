// ============================================================
// FRANCHISE DATA — Nõva Sushi
// ============================================================

export const FRANCHISE_METRICS = [
  {
    value: "30-45",
    unit: "pedidos/día",
    label: "Local propio en Córdoba",
  },
  {
    value: "$34.000 - $35.000",
    unit: "",
    label: "Ticket promedio",
  },
  {
    value: "35-40%",
    unit: "",
    label: "Margen bruto estimado",
  },
  {
    value: "12-18",
    unit: "meses",
    label: "Recupero estimado (escenario base)",
  },
] as const;

export const FRANCHISE_FORMATS = [
  {
    id: "dark-kitchen",
    name: "Dark Kitchen / Takeaway",
    ideal: "Menor inversión inicial, zonas con alta demanda delivery.",
    surface: "Desde 30m²",
    focus: "Delivery y take away exclusivamente",
    investment: "$25.000 USD",
    highlights: ["Sin salón", "Alta rotación", "Operación más simple"],
  },
  {
    id: "local",
    name: "Local Gastronómico",
    ideal: "Zonas con tráfico peatonal, experiencia presencial + delivery.",
    surface: "Desde 60m²",
    focus: "Salón + delivery",
    investment: "$40.000 USD",
    highlights: ["Salón integrado", "Mayor ticket en local", "Más impacto de marca"],
  },
] as const;

export const FRANCHISE_INVESTMENT = {
  rangeMin: "USD $25.000",
  rangeMax: "USD $40.000",
  includes: [
    "Licencia de uso de marca (fee inicial)",
    "Equipamiento de cocina homologado",
    "Capacitación inicial (cocina + operación + atención)",
    "Manual operativo completo",
    "Kit de marketing y materiales de apertura",
    "Asesoramiento en búsqueda y habilitación del local",
    "Acompañamiento activo los primeros 90 días",
  ],
  excludes: [
    "Alquiler y refacción del local",
    "Capital de trabajo (primeros meses)",
    "Habilitaciones municipales",
  ],
  royaltyNote:
    "El royalty mensual se define individualmente según el formato y la plaza. El dossier completo, con contrato y proyecciones, se comparte en la evaluación.",
} as const;

export const FRANCHISE_ROI_SCENARIOS = [
  {
    id: "conservador",
    label: "Conservador",
    highlight: false,
    pedidos: "20-25",
    ticketPromedio: "$34.000",
    facturacionMensual: "$20.400.000 - $25.500.000",
    margenNeto: "10-12%",
    recupero: "18-24 meses",
  },
  {
    id: "base",
    label: "Base",
    highlight: true,
    pedidos: "30-40",
    ticketPromedio: "$34.500",
    facturacionMensual: "$31.000.000 - $41.400.000",
    margenNeto: "12-15%",
    recupero: "12-18 meses",
  },
  {
    id: "optimista",
    label: "Optimista",
    highlight: false,
    pedidos: "45-60",
    ticketPromedio: "$35.000",
    facturacionMensual: "$47.250.000 - $63.000.000",
    margenNeto: "15-18%",
    recupero: "10-12 meses",
  },
] as const;

export const FRANCHISE_PROCESS_STEPS = [
  {
    step: "01",
    title: "Aplicás",
    desc: "Completás el formulario con tus datos y capital estimado. Nos da contexto para evaluar tu caso sin perder tiempo.",
    time: "3 minutos",
  },
  {
    step: "02",
    title: "Primera conversación",
    desc: "Hablamos por WhatsApp o llamada. Te contamos todo lo que no está en la web, sin presión y sin vendedor.",
    time: "1 llamada",
  },
  {
    step: "03",
    title: "Evaluación conjunta",
    desc: "Analizamos tu ciudad, zona y formato. Te compartimos el dossier completo: números reales, contrato y proyecciones.",
    time: "1–2 semanas",
  },
  {
    step: "04",
    title: "Acuerdo y capacitación",
    desc: "Firmamos el acuerdo y arranca el onboarding. Cocina, operación y manejo de equipo. Tu local empieza a tomar forma.",
    time: "2–4 semanas",
  },
  {
    step: "05",
    title: "Apertura con soporte",
    desc: "Apertura con acompañamiento del equipo Nõva. Los primeros 90 días no estás solo.",
    time: "Día 1",
  },
] as const;

export const FRANCHISE_TRUST = {
  openingSince: "[AÑO_DE_APERTURA]", // Reemplazar por el año de apertura real (ej: "2022")
  totalOrders: "+10.000", // Estimado. Ajustar al número histórico real si es mayor.
  responseTime: "24–48 hs",
} as const;

export const FRANCHISE_CAPITAL_OPTIONS = [
  "Menos de USD 15.000",
  "USD 15.000 – 30.000",
  "USD 30.000 – 50.000",
  "Más de USD 50.000",
  "Prefiero no decirlo por ahora",
] as const;

export const FRANCHISE_EXP_OPTIONS = [
  "Sin experiencia",
  "1–3 años en gastronomía",
  "+3 años en gastronomía",
  "Tengo local propio activo",
] as const;