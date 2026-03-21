import { BRANCHES, CONTACT } from "src/lib/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 py-10 px-6">
      <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-white/60">
        {/* Marca */}
        <div className="space-y-2">
          <p className="font-semibold text-white text-base tracking-wide">Nõva Sushi</p>
          {BRANCHES.map((b) => (
            <p key={b.name}>{b.name} · {b.address}</p>
          ))}
          <p>Lun–Vie 11:30–14:30 / 18:00–23:00</p>
          <p>Sáb–Dom 19:00–23:59</p>
        </div>

        {/* Links */}
        <nav aria-label="Navegación del sitio">
          <ul className="space-y-2">
            <li><a href="#menu" className="hover:text-white transition">Carta</a></li>
            <li><a href="#story" className="hover:text-white transition">Nuestra historia</a></li>
            <li><a href="#location" className="hover:text-white transition">Ubicación</a></li>
            <li><a href="/franquicias" className="hover:text-white transition">Franquicias</a></li>
          </ul>
        </nav>

        {/* Contacto */}
        <div className="space-y-2">
          <p className="font-medium text-white/80">Contacto</p>
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition block"
          >
            WhatsApp pedidos
          </a>
          <a
            href={`mailto:${CONTACT.email}`}
            className="hover:text-white transition block"
          >
            {CONTACT.email}
          </a>
          <a
            href={CONTACT.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition block"
          >
            Ver en Google Maps
          </a>
        </div>
      </div>

      <p className="mt-8 text-center text-white/40 text-sm">
        © {year} Nõva Sushi. Todos los derechos reservados.
      </p>
    </footer>
  );
}
