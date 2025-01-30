"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import CodeBlock from "@/components/CodeBlock"

interface PriorityQueueItem {
  value: string
  priority: number
}

const MAX_SIZE = 5

export default function PriorityQueuePage() {
  const [queue, setQueue] = useState<PriorityQueueItem[]>([])
  const [inputValue, setInputValue] = useState("")
  const [inputPriority, setInputPriority] = useState("")

  const enqueue = () => {
    if (inputValue.trim() !== "" && inputPriority.trim() !== "") {
      if (queue.length >= MAX_SIZE) {
        alert("Queue is full!")
        return
      }
      const newItem: PriorityQueueItem = {
        value: inputValue.trim(),
        priority: Number.parseInt(inputPriority.trim()),
      }
      const newQueue = [...queue, newItem].sort((a, b) => b.priority - a.priority)
      setQueue(newQueue)
      setInputValue("")
      setInputPriority("")
    }
  }

  const dequeue = () => {
    if (queue.length > 0) {
      setQueue(queue.slice(1))
    } else {
      alert("Queue is empty!")
    }
  }

  const getDescription = () => {
    const size = queue.length
    if (size === 0) {
      return "The priority queue is currently empty. You can add elements with priorities using the enqueue operation."
    } else if (size === MAX_SIZE) {
      return "The priority queue is full. You need to dequeue an element before you can add more."
    } else {
      return `The priority queue contains ${size} element${
        size > 1 ? "s" : ""
      }. Elements are ordered by their priority, with higher priority elements at the front of the queue.`
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Priority Queue</h2>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter item"
            className="bg-background text-foreground"
          />
          <Input
            type="number"
            value={inputPriority}
            onChange={(e) => setInputPriority(e.target.value)}
            placeholder="Priority"
            className="bg-background text-foreground"
          />
          <Button onClick={enqueue} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Enqueue
          </Button>
          <Button onClick={dequeue} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            Dequeue
          </Button>
        </div>
        <div className="bg-background p-4 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-2 text-primary">Current Queue:</h3>
          <div className="flex flex-col items-start space-y-2">
            {queue.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center space-x-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-8 h-8 flex items-center justify-center bg-accent text-accent-foreground rounded-full">
                  {item.priority}
                </div>
                <div className="bg-primary text-primary-foreground px-4 py-2 rounded">{item.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="bg-background p-4 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-2 text-primary">Description:</h3>
          <p>{getDescription()}</p>
        </div>
        <div className="bg-background p-4 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-2 text-primary">C Code Implementation:</h3>
          <CodeBlock
            code={`
#include <stdio.h>
#include <stdlib.h>

#define MAX_SIZE 5

typedef struct {
    int value;
    int priority;
} PQElement;

typedef struct {
    PQElement items[MAX_SIZE];
    int size;
} PriorityQueue;

void initializeQueue(PriorityQueue *pq) {
    pq->size = 0;
}

int isFull(PriorityQueue *pq) {
    return pq->size == MAX_SIZE;
}

int isEmpty(PriorityQueue *pq) {
    return pq->size == 0;
}

void enqueue(PriorityQueue *pq, int value, int priority) {
    if (isFull(pq)) {
        printf("Queue is full!\\n");
        return;
    }

    PQElement newElement = {value, priority};
    int i;
    for (i = pq->size - 1; i >= 0; i--) {
        if (pq->items[i].priority > priority) {
            pq->items[i + 1] = pq->items[i];
        } else {
            break;
        }
    }
    pq->items[i + 1] = newElement;
    pq->size++;
    printf("Enqueued: %d with priority %d\\n", value, priority);
}

int dequeue(PriorityQueue *pq) {
    if (isEmpty(pq)) {
        printf("Queue is empty!\\n");
        return -1;
    }
    int value = pq->items[0].value;
    for (int i = 0; i < pq->size - 1; i++) {
        pq->items[i] = pq->items[i + 1];
    }
    pq->size--;
    printf("Dequeued: %d\\n", value);
    return value;
}

void display(PriorityQueue *pq) {
    if (isEmpty(pq)) {
        printf("Queue is empty\\n");
        return;
    }
    printf("Queue elements (value, priority): ");
    for (int i = 0; i < pq->size; i++) {
        printf("(%d, %d) ", pq->items[i].value, pq->items[i].priority);
    }
    printf("\\n");
}

int main() {
    PriorityQueue pq;
    initializeQueue(&pq);

    enqueue(&pq, 3, 1);
    enqueue(&pq, 4, 2);
    enqueue(&pq, 2, 3);
    enqueue(&pq, 1, 4);
    display(&pq);

    dequeue(&pq);
    display(&pq);

    enqueue(&pq, 5, 2);
    display(&pq);

    return 0;
}
`}
            language="c"
          />
        </div>
      </div>
    </div>
  )
}

