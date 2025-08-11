"use client";
import { useEffect, useState } from "react";

type Props = { ids: string[] };

export default function DotsNav({ ids }: Props) {
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive((visible.target as HTMLElement).id);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0.2, 0.6, 1] }
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [ids]);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {ids.map((id) => (
        <button
          key={id}
          onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
          aria-label={`Ir a ${id}`}
          className={`w-3 h-3 rounded-full transition outline-none ring-1 ring-white/30
            ${active === id ? "scale-125 bg-brand-accent" : "bg-white/40 hover:bg-white"}`}
        />
      ))}
    </div>
  );
}