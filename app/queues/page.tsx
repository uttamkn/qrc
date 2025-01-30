export default function QueuesPage() {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Queue Overview</h2>
      <p>
        A queue is a fundamental data structure that follows the First-In-First-Out (FIFO) principle. It's similar to a
        real-world queue or line, where the first person to join the line is the first one to be served.
      </p>
      <p>In computer science, queues are used in various applications, including:</p>
      <ul className="list-disc list-inside">
        <li>Task scheduling in operating systems</li>
        <li>Handling requests in web servers</li>
        <li>Breadth-first search in graph algorithms</li>
        <li>Buffering in data streams</li>
      </ul>
      <p>Explore the following types of queues with interactive visualizations:</p>
      <ul className="list-disc list-inside">
        <li>Simple Queue - The basic implementation of a queue</li>
        <li>Circular Queue - A space-efficient version of a queue using a circular buffer</li>
        <li>Double-ended Queue (Deque) - A queue that allows insertion and deletion at both ends</li>
        <li>Priority Queue - A queue where elements have associated priorities</li>
      </ul>
      <p>
        Each page demonstrates the queue type with interactive visualizations and C code implementations to help you
        understand how these data structures work.
      </p>
    </div>
  )
}

