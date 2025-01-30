"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import RecursiveTreeVisualization from "@/components/RecursiveTreeVisualization"
import CallstackVisualization from "@/components/CallstackVisualization"
import CodeBlock from "@/components/CodeBlock"

const factorialCode = `
#include <stdio.h>

int factorial(int n) {
    if (n == 0 || n == 1) {
        return 1;
    }
    return n * factorial(n - 1);
}

int main() {
    int n = 5;
    printf("Factorial of %d is %d\\n", n, factorial(n));
    return 0;
}
`

interface TreeNode {
  name: string
  attributes?: { [key: string]: string | number }
  children?: TreeNode[]
}

function generateFactorialSteps(n: number): TreeNode[] {
  const steps: TreeNode[] = []

  function buildTree(n: number): TreeNode {
    if (n === 0 || n === 1) {
      const node = { name: `factorial(${n})`, attributes: { result: 1 } }
      steps.push({ ...node })
      return node
    }
    const node: TreeNode = { name: `factorial(${n})`, children: [] }
    steps.push({ ...node })
    const child = buildTree(n - 1)
    node.children = [child]
    steps.push({ ...node })
    const result = n * (child.attributes?.result as number)
    node.attributes = { result }
    steps.push({ ...node })
    return node
  }

  buildTree(n)
  return steps
}

export default function FactorialPage() {
  const [input, setInput] = useState("5")
  const [result, setResult] = useState<number | null>(null)
  const [callstack, setCallstack] = useState<string[]>([])
  const [treeSteps, setTreeSteps] = useState<TreeNode[]>([])
  const [calculating, setCalculating] = useState(false)

  const calculateFactorial = (n: number): number => {
    if (n === 0 || n === 1) {
      setCallstack((prev) => [...prev, `factorial(${n}) = 1`])
      return 1
    }
    setCallstack((prev) => [...prev, `factorial(${n}) calls factorial(${n - 1})`])
    const subResult = n * calculateFactorial(n - 1)
    setCallstack((prev) => [...prev, `factorial(${n}) = ${n} * factorial(${n - 1}) = ${subResult}`])
    return subResult
  }

  const handleCalculate = () => {
    const n = Number.parseInt(input)
    setCallstack([])
    setCalculating(true)
    const result = calculateFactorial(n)
    setResult(result)
    setTreeSteps(generateFactorialSteps(n))
    setCalculating(false)
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Factorial Recursion</h2>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter a number"
            className="bg-background text-foreground"
          />
          <Button onClick={handleCalculate} className="bg-primary text-primary-foreground" disabled={calculating}>
            Calculate
          </Button>
        </div>
        {result !== null && (
          <p className="text-lg">
            Factorial of {input} is: <strong>{result}</strong>
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <CallstackVisualization callstack={callstack} />
        </div>
        <div className="bg-card p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">Recursion Tree</h3>
          {treeSteps.length > 0 && (
            <RecursiveTreeVisualization data={treeSteps[treeSteps.length - 1]} steps={treeSteps} />
          )}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Explanation</h3>
        <p>
          The factorial function is a classic example of recursion. It's defined as the product of all positive integers
          less than or equal to n. For example, 5! = 5 * 4 * 3 * 2 * 1 = 120.
        </p>
        <p className="mt-2">
          In the visualization above, you can see how the function calls itself with a smaller number until it reaches
          the base case (0 or 1). Then it starts to return and multiply the results back up the chain.
        </p>
        <p className="mt-2">
          Use the "Previous" and "Next" buttons to step through the recursion process and see how the tree builds up and
          then calculates the final result.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">C Code Implementation</h3>
        <CodeBlock code={factorialCode} language="c" />
      </div>
    </div>
  )
}

