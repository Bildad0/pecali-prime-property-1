import { useEffect } from "react";

export default function useLoadSuseMono() {
  useEffect(() => {
    const href = "https://fonts.googleapis.com/css2?family=SUSE+Mono:wght@400;700&display=swap";
    if (!document.querySelector(`link[href="${href}"]`)) {
      const link = document.createElement("link");
      link.href = href;
      link.rel = "stylesheet";
      document.head.appendChild(link);
      return () => {
        // eslint-disable-next-line no-empty
        try { document.head.removeChild(link); } catch {}
      };
    }
  }, []);
}