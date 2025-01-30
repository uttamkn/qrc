"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import RecursiveTreeVisualization from "@/components/RecursiveTreeVisualization"
import CallstackVisualization from "@/components/CallstackVisualization"
import CodeBlock from "@/components/CodeBlock"

const fibonacciCode = `
#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    int n = 5;
    printf("The %dth Fibonacci number is %d\\n", n, fibonacci(n));
    return 0;
}
`

interface TreeNode {
  name: string
  attributes?: { [key: string]: string | number }
  children?: TreeNode[]
}

function generateFibonacciTree(n: number): TreeNode {
  if (n <= 1) {
    return { name: `fibonacci(${n})`, attributes: { result: n } }
  }
  const left = generateFibonacciTree(n - 1)
  const right = generateFibonacciTree(n - 2)
  const result = (left.attributes?.result as number) + (right.attributes?.result as number)
  return {
    name: `fibonacci(${n})`,
    attributes: { result },
    children: [left, right],
  }
}

export default function FibonacciPage() {
  const [input, setInput] = useState("5")
  const [result, setResult] = useState<number | null>(null)
  const [callstack, setCallstack] = useState<string[]>([])
  const [treeData, setTreeData] = useState<TreeNode | null>(null)
  const [calculating, setCalculating] = useState(false)

  const calculateFibonacci = (n: number): number => {
    setCallstack((prev) => [...prev, `fibonacci(${n})`])
    if (n <= 1) {
      setCallstack((prev) => [...prev, `return ${n}`])
      return n
    }
    const subResult = calculateFibonacci(n - 1) + calculateFibonacci(n - 2)
    setCallstack((prev) => [...prev, `return fibonacci(${n - 1}) + fibonacci(${n - 2}) = ${subResult}`])
    return subResult
  }

  const handleCalculate = () => {
    const n = Number.parseInt(input)
    setCallstack([])
    setCalculating(true)
    const result = calculateFibonacci(n)
    setResult(result)
    setTreeData(generateFibonacciTree(n))
    setCalculating(false)
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Fibonacci Recursion</h2>
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
            The {input}th Fibonacci number is: <strong>{result}</strong>
          </p>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <CallstackVisualization callstack={callstack} />
        </div>
        <div className="bg-card p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2 text-card-foreground">Recursion Tree</h3>
          {treeData && <RecursiveTreeVisualization data={treeData} />}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">C Code Implementation</h3>
        <CodeBlock code={fibonacciCode} language="c" />
      </div>
    </div>
  )
}

