import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function AnimatedNumber({ value, color }: { value: number, color: string }) {
  const [displayValue, setDisplayValue] = useState(value);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      prevValue.current = value;
      setDisplayValue(value);
    }
  }, [value]);

  return (
    <div className="relative h-[40px] overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.span
          key={displayValue}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute inset-0 text-[40px] font-bold leading-none tracking-tight"
          style={{ color }}
        >
          {displayValue}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
