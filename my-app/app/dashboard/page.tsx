"use client";
import React from "react";

export default function DashboardPage() {
     const iframeSrc = "https://krishi-mitra-dashboard.vercel.app/";

     return (
          <iframe
               src={iframeSrc}
               style={{
                    width: "100%",
                    height: "100vh",
                    border: "none"
               }}
               title="Krishi Mitra Dashboard"
          />
     );
}
