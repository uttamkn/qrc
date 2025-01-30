import Link from "next/link"
import { motion } from "framer-motion"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8 bg-background text-foreground">
      <motion.h1
        className="text-4xl font-bold mb-6 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Interactive Data Structures Learning
      </motion.h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants}>
          <Link href="/queues" className="block p-6 bg-primary rounded-lg hover:bg-primary/90 transition-colors">
            <h2 className="text-2xl font-semibold mb-2 text-primary-foreground">Queues</h2>
            <p className="text-primary-foreground/80">
              Learn about different types of queues with interactive visualizations.
            </p>
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="/recursion" className="block p-6 bg-secondary rounded-lg hover:bg-secondary/90 transition-colors">
            <h2 className="text-2xl font-semibold mb-2 text-secondary-foreground">Recursion</h2>
            <p className="text-secondary-foreground/80">
              Master recursive problem-solving with step-by-step visualizations.
            </p>
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="/practice" className="block p-6 bg-accent rounded-lg hover:bg-accent/90 transition-colors">
            <h2 className="text-2xl font-semibold mb-2 text-accent-foreground">Practice</h2>
            <p className="text-accent-foreground/80">Test your knowledge with interactive exercises and quizzes.</p>
          </Link>
        </motion.div>
        <motion.div variants={itemVariants}>
          <Link href="/leaderboard" className="block p-6 bg-primary rounded-lg hover:bg-primary/90 transition-colors">
            <h2 className="text-2xl font-semibold mb-2 text-primary-foreground">Leaderboard</h2>
            <p className="text-primary-foreground/80">See how you rank against other learners.</p>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

