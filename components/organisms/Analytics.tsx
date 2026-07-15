"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "";
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN?.trim() || "";

function readConsent(): boolean {
  try {
    return localStorage.getItem("mufat-cookie-consent") === "accepted";
  } catch {
    return false;
  }
}

/**
 * GA4 / Plausible — yalnızca çerez onayı sonrası.
 * NEXT_PUBLIC_GA_MEASUREMENT_ID ve/veya NEXT_PUBLIC_PLAUSIBLE_DOMAIN
 */
export default function Analytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    if (!GA_ID && !PLAUSIBLE_DOMAIN) return;

    const sync = (accepted: boolean) => setAllowed(accepted);
    sync(readConsent());

    const onConsent = (e: Event) => {
      sync(Boolean((e as CustomEvent<{ accepted?: boolean }>).detail?.accepted));
    };
    window.addEventListener("mufat:consent", onConsent as EventListener);
    return () => window.removeEventListener("mufat:consent", onConsent as EventListener);
  }, []);

  if (!allowed || (!GA_ID && !PLAUSIBLE_DOMAIN)) return null;

  return (
    <>
      {GA_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}', { anonymize_ip: true });
          `}</Script>
        </>
      ) : null}
      {PLAUSIBLE_DOMAIN ? (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      ) : null}
    </>
  );
}
