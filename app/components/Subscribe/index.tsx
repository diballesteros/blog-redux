import { motion, useReducedMotion } from "framer-motion";

import SubscribeButton from "../SubscribeButton";
import SubscribeText from "../SubscribeText";

export default function Subscribe() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <motion.div
        className="hidden flex-col sm:flex"
        initial="initial"
        animate="visible"
        variants={{
          initial: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
        }}
      >
        <motion.p
          className="mb-8 text-5xl font-bold !leading-[4.5rem] lg:text-6xl"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -25 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        >
          Helping <span className="text-header">devs</span> become better{" "}
          <span className="text-header">devs</span>
        </motion.p>
        <motion.p
          className="mb-8 text-lg lg:text-xl"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -25 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
        >
          <SubscribeText />
        </motion.p>
        <motion.div
          className="self-center"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <SubscribeButton />
        </motion.div>
      </motion.div>
      <div className="flex flex-col sm:hidden">
        <p className="mb-8 text-3xl font-bold">
          {" "}
          Helping <span className="text-header">devs</span> become better{" "}
          <span className="text-header">devs</span>
        </p>
        <p className="mb-8 text-lg">
          <SubscribeText />
        </p>
        <div className="self-center">
          <SubscribeButton />
        </div>
      </div>
    </>
  );
}
