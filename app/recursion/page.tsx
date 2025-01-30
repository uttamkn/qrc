export default function RecursionPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Recursion Overview</h2>
      <p>
        Recursion is a programming technique where a function calls itself to solve a problem by breaking it down into
        smaller, similar subproblems. It's a powerful concept used in many algorithms and data structures.
      </p>
      <p>Explore the following recursive algorithms:</p>
      <ul className="list-disc list-inside">
        <li>Factorial - Calculate the product of all positive integers up to a given number</li>
        <li>Fibonacci - Generate the Fibonacci sequence where each number is the sum of the two preceding ones</li>
        <li>Tower of Hanoi - Solve the classic puzzle of moving disks between pegs</li>
      </ul>
      <p>
        Each page demonstrates the algorithm with C code, a callstack visualization, and a recursion tree to help you
        understand how these recursive algorithms work.
      </p>
    </div>
  )
}

