import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type Props = {
  copied: boolean;
  id: string;
  text?: [pre: string, post: string];
};

export default function Copy({ copied, id, text }: Props) {
  const shouldReduceMotion = useReducedMotion();

  const draw = {
    hidden: {
      opacity: 0,
    },
    visible: () => {
      return {
        opacity: 1,
        transition: {
          opacity: {
            duration: shouldReduceMotion ? 0 : 0.5,
          },
        },
      };
    },
  };

  return (
    <AnimatePresence>
      {copied ? (
        <>
          {text ? `${text[1]} ` : ""}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            key={`${id}-copied`}
            initial="hidden"
            animate="visible"
            exit={shouldReduceMotion ? undefined : "hidden"}
          >
            <motion.path
              d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"
              variants={draw}
            />
            <motion.path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
              variants={draw}
            />
          </motion.svg>
        </>
      ) : (
        <>
          {text ? `${text[0]} ` : ""}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
            key={`${id}-not-copied`}
            initial="hidden"
            animate="visible"
            exit={shouldReduceMotion ? undefined : "hidden"}
          >
            <motion.path
              d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"
              variants={draw}
            />
            <motion.path
              d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"
              variants={draw}
            />
          </motion.svg>
        </>
      )}
    </AnimatePresence>
  );
}
