import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="w-full h-full flex gap-3 justify-center items-center">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-6 h-6 rounded-full bg-primary"
          animate={{
            y: [0, -10, 0], // Gore, dole, nazad
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2, // Kašnjenje između kružića
          }}
        />
      ))}
    </div>
  );
};

export default Loading;
