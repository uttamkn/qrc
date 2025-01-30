"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Tree from "react-d3-tree"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import styles from "./RecursiveTreeVisualization.module.css"

interface TreeNode {
  name: string
  attributes?: { [key: string]: string | number }
  children?: TreeNode[]
}

interface RecursiveTreeVisualizationProps {
  data: TreeNode
  steps: TreeNode[]
}

const RecursiveTreeVisualization: React.FC<RecursiveTreeVisualizationProps> = ({ data, steps }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [treeData, setTreeData] = useState<TreeNode>(steps[0])

  useEffect(() => {
    setTreeData(steps[currentStep])
  }, [currentStep, steps])

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 500 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: "100%", height: "500px" }}
      className="relative"
    >
      <Tree
        data={treeData}
        orientation="vertical"
        pathFunc="step"
        translate={{ x: 200, y: 20 }}
        nodeSize={{ x: 200, y: 50 }}
        separation={{ siblings: 1, nonSiblings: 2 }}
        rootNodeClassName={styles.node__root}
        branchNodeClassName={styles.node__branch}
        leafNodeClassName={styles.node__leaf}
      />
      <div className="absolute bottom-4 left-4 space-x-2">
        <Button onClick={handlePrevious} disabled={currentStep === 0}>
          Previous
        </Button>
        <Button onClick={handleNext} disabled={currentStep === steps.length - 1}>
          Next
        </Button>
      </div>
      <div className="absolute bottom-4 right-4">
        Step {currentStep + 1} of {steps.length}
      </div>
    </motion.div>
  )
}

export default RecursiveTreeVisualization

