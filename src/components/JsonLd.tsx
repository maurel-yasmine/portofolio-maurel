import { useEffect } from "react";

interface JsonLdProps {
  /**
   * Stable key for this block of structured data.
   * It is also written to `data-jsonld`, which lets the component reuse a
   * block that was already emitted at build time (no duplicates in <head>).
   */
  id: string;
  /** The JSON-LD payload. Pass a string so the effect only re-runs on change. */
  json: string;
}

/**
 * Adds a `<script type="application/ld+json">` to <head> imperatively.
 *
 * React 19 warns when a component renders a raw <script> tag, so we create
 * the element directly instead. If a block with the same id already exists
 * (for example the one injected into index.html at build time) it is reused
 * and updated rather than duplicated.
 */
export function JsonLd({ id, json }: JsonLdProps) {
  useEffect(() => {
    const selector = `script[data-jsonld="${id}"]`;
    let element = document.head.querySelector<HTMLScriptElement>(selector);
    const created = !element;

    if (!element) {
      element = document.createElement("script");
      element.type = "application/ld+json";
      element.setAttribute("data-jsonld", id);
      document.head.appendChild(element);
    }

    element.textContent = json;

    return () => {
      if (created) {
        element?.remove();
      }
    };
  }, [id, json]);

  return null;
}
