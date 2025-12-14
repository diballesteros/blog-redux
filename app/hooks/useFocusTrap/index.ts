import { useCallback, useEffect, useRef } from "react";

import { scopeTab } from "./scopeTab";
import { FOCUS_SELECTOR, focusable, tabbable } from "./tabbable";

export default function useFocusTrap(
  active = false
): (instance: HTMLElement | null) => void {
  const ref = useRef<HTMLElement | null>(null);

  const setRef = useCallback(
    (node: HTMLElement | null) => {
      if (!active) return;

      if (node) {
        const processNode = (_node: HTMLElement) => {
          const children = Array.from<HTMLElement>(
            _node.querySelectorAll(FOCUS_SELECTOR)
          );
          const focusElement =
            children.find(tabbable) || children.find(focusable) || null;

          focusElement?.focus();
        };

        setTimeout(() => {
          if (node.ownerDocument) {
            processNode(node);
          }
        });

        ref.current = node;
      } else {
        ref.current = null;
      }
    },
    [active]
  );

  useEffect(() => {
    if (!active) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Tab" && ref.current) {
        scopeTab(ref.current, event);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [active]);

  return setRef;
}
