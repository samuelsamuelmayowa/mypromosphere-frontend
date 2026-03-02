import { useState } from 'react'
import {
    useMotionValueEvent,
    useScroll,
  } from "framer-motion";

export function useMobileNavScroll() {
    const [hidden, setHidden] = useState(true);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 50) {
            setHidden(false);
        } else {
            setHidden(true);
        }
    });
    return {
        hidden
    }
}
