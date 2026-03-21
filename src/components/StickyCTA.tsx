"use client";
import WaBranchPicker from "./WaBranchPicker";

export default function StickyCTA() {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center px-4">
      <WaBranchPicker
        className="btn-wa px-5 py-3 shadow-xl"
        label="Hablar por WhatsApp"
        iconSize={22}
        style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
      />
    </div>
  );
}
