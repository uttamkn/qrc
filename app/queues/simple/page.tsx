import SimpleQueue from "../../../components/SimpleQueue"

export default function SimpleQueuePage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Simple Queue</h2>
      <p className="mb-4">
        A simple queue is the most basic implementation of a queue data structure. It follows the First In, First Out
        (FIFO) principle, where the first element added to the queue is the first one to be removed.
      </p>
      <h3 className="text-xl font-semibold mb-2">Interactive Simple Queue</h3>
      <p className="mb-4">Try out the basic operations of a simple queue:</p>
      <SimpleQueue />
    </div>
  )
}

