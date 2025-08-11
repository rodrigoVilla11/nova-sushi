"use client";

export default function StickyCTA() {
  const whatsappNumber = "5493512345678"; // Reemplaza por tu número con código de país
  const message = "¡Hola! Quiero reservar una mesa."; // Mensaje inicial opcional

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-5 py-3 rounded-full text-white font-medium tracking-wide hover:brightness-110 active:scale-95 transition shadow-xl"
        style={{
          backgroundColor: "#25D366",
          boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
        }}
      >
        {/* Logo de WhatsApp (SVG inline) */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 32 32"
          fill="currentColor"
        >
          <path d="M16.004 2.003c-7.74 0-14 6.262-14 14 0 2.465.648 4.87 1.884 6.992l-1.996 7.324 7.512-1.968c2.057 1.122 4.375 1.711 6.738 1.711h.002c7.74 0 14-6.262 14-14s-6.26-14.059-14-14.059zM16.002 26.941c-2.07 0-4.084-.555-5.844-1.605l-.418-.246-4.457 1.168 1.184-4.34-.273-.445c-1.168-1.902-1.785-4.09-1.785-6.34 0-6.605 5.383-11.984 12-11.984 3.199 0 6.207 1.246 8.469 3.504 2.266 2.27 3.516 5.277 3.516 8.48-.001 6.615-5.384 12.008-12.392 12.008zM22.602 19.441c-.336-.168-1.992-.984-2.301-1.098-.309-.113-.535-.168-.762.168s-.871 1.098-1.07 1.328c-.197.223-.395.252-.73.084-.336-.168-1.418-.523-2.699-1.672-1-.891-1.672-1.992-1.871-2.328-.197-.336-.021-.516.148-.684.152-.152.336-.395.504-.59.168-.197.223-.336.336-.559.113-.223.057-.418-.029-.59-.084-.168-.762-1.84-1.043-2.523-.275-.66-.555-.57-.762-.582-.195-.012-.418-.014-.641-.014s-.59.084-.898.418c-.309.336-1.18 1.152-1.18 2.812s1.207 3.266 1.375 3.492c.168.223 2.367 3.613 5.73 5.059.801.344 1.426.551 1.914.703.805.256 1.539.219 2.121.133.648-.098 1.992-.812 2.273-1.598.281-.785.281-1.457.197-1.598-.084-.141-.309-.223-.645-.391z" />
        </svg>

        Hablar por WhatsApp
      </a>
    </div>
  );
}
