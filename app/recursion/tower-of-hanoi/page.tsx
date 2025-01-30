"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import RecursiveTreeVisualization from "@/components/RecursiveTreeVisualization"
import CallstackVisualization from "@/components/CallstackVisualization"
import CodeBlock from "@/components/CodeBlock"

const towerOfHanoiCode = `
#include <stdio.h>

void towerOfHanoi(int n, char from_rod, char to_rod, char aux_rod) {
    if (n == 1) {
        printf("Move disk 1 from rod %c to rod %c\\n", from_rod, to_rod);
        return;
    }
    towerOfHanoi(n - 1, from_rod, aux_rod, to_rod);
    printf("Move disk %d from rod %c to rod %c\\n", n, from_rod, to_rod);
    towerOfHanoi(n - 1, aux_rod, to_rod, from_rod);
}

int main() {
    int n = 3;
    towerOfHanoi(n, 'A', 'C', 'B');
    return 0;
}
`

export default function TowerOfHanoiPage() {
  const [input, setInput] = useState("3")
  const [moves, setMoves] = useState<string[]>([])
  const [callstack, setCallstack] = useState<string[]>([])

  const solveTowerOfHanoi = (n: number, from: string, to: string, aux: string): void => {
    setCallstack((prev) => [...prev, `towerOfHanoi(${n}, ${from}, ${to}, ${aux})`])
    if (n === 1) {
      setMoves((prev) => [...prev, `Move disk 1 from ${from} to ${to}`])
      setCallstack((prev) => [...prev, `Move disk 1 from ${from} to ${to}`])
      return
    }
    solveTowerOfHanoi(n - 1, from, aux, to)
    setMoves((prev) => [...prev, `Move disk ${n} from ${from} to ${to}`])
    setCallstack((prev) => [...prev, `Move disk ${n} from ${from} to ${to}`])
    solveTowerOfHanoi(n - 1, aux, to, from)
  }

  const handleSolve = () => {
    const n = Number.parseInt(input)
    setMoves([])
    setCallstack([])
    solveTowerOfHanoi(n, "A", "C", "B")
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Tower of Hanoi Recursion</h2>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter number of disks"
            className="bg-background text-foreground"
          />
          <Button onClick={handleSolve} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Solve
          </Button>
        </div>
        {moves.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Solution Steps:</h3>
            <ul className="list-decimal list-inside">
              {moves.map((move, index) => (
                <li key={index}>{move}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Callstack</h3>
          <CallstackVisualization callstack={callstack} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Recursion Tree</h3>
          <RecursiveTreeVisualization
            data={{
              name: `towerOfHanoi(${input}, A, C, B)`,
              children: [
                {
                  name: `towerOfHanoi(${Number.parseInt(input) - 1}, A, B, C)`,
                },
                {
                  name: `Move disk ${input} from A to C`,
                },
                {
                  name: `towerOfHanoi(${Number.parseInt(input) - 1}, B, C, A)`,
                },
              ],
            }}
          />
        </div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">C Code Implementation</h3>
        <CodeBlock code={towerOfHanoiCode} language="c" />
      </div>
    </div>
  )
}

