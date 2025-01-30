"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import CodeBlock from "@/components/CodeBlock"

const MAX_SIZE = 5

export default function CircularQueuePage() {
  const [queue, setQueue] = useState<(string | null)[]>(new Array(MAX_SIZE).fill(null))
  const [front, setFront] = useState(-1)
  const [rear, setRear] = useState(-1)
  const [inputValue, setInputValue] = useState("")

  const enqueue = () => {
    if (inputValue.trim() !== "") {
      if ((rear + 1) % MAX_SIZE === front) {
        alert("Queue is full!")
        return
      }
      if (front === -1) {
        setFront(0)
        setRear(0)
      } else {
        setRear((rear + 1) % MAX_SIZE)
      }
      const newQueue = [...queue]
      newQueue[rear] = inputValue.trim()
      setQueue(newQueue)
      setInputValue("")
    }
  }

  const dequeue = () => {
    if (front === -1) {
      alert("Queue is empty!")
      return
    }
    const newQueue = [...queue]
    newQueue[front] = null
    if (front === rear) {
      setFront(-1)
      setRear(-1)
    } else {
      setFront((front + 1) % MAX_SIZE)
    }
    setQueue(newQueue)
  }

  const getDescription = () => {
    const size = queue.filter((item) => item !== null).length
    if (size === 0) {
      return "The circular queue is currently empty. You can add elements using the enqueue operation."
    } else if (size === MAX_SIZE) {
      return "The circular queue is full. You need to dequeue an element before you can add more."
    } else {
      return `The circular queue contains ${size} element${
        size > 1 ? "s" : ""
      }. You can continue to add elements until it reaches its maximum capacity of ${MAX_SIZE}.`
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Circular Queue</h2>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter item"
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
          <div className="flex justify-center items-center h-20">
            {queue.map((item, index) => (
              <motion.div
                key={index}
                className={`w-16 h-16 flex items-center justify-center rounded-full border-2 m-1 ${
                  item ? "bg-primary text-primary-foreground" : "bg-background text-foreground"
                } ${index === front ? "border-green-500" : ""} ${index === rear ? "border-red-500" : ""}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {item || ""}
              </motion.div>
            ))}
          </div>
          <div className="mt-2 text-center">
            <span className="text-green-500 mr-4">Front: {front}</span>
            <span className="text-red-500">Rear: {rear}</span>
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
    int items[MAX_SIZE];
    int front;
    int rear;
} CircularQueue;

void initializeQueue(CircularQueue *q) {
    q->front = -1;
    q->rear = -1;
}

int isFull(CircularQueue *q) {
    return ((q->rear + 1) % MAX_SIZE == q->front);
}

int isEmpty(CircularQueue *q) {
    return (q->front == -1);
}

void enqueue(CircularQueue *q, int value) {
    if (isFull(q)) {
        printf("Queue is full!\\n");
        return;
    }
    if (isEmpty(q)) {
        q->front = 0;
        q->rear = 0;
    } else {
        q->rear = (q->rear + 1) % MAX_SIZE;
    }
    q->items[q->rear] = value;
    printf("%d enqueued to the queue\\n", value);
}

int dequeue(CircularQueue *q) {
    if (isEmpty(q)) {
        printf("Queue is empty!\\n");
        return -1;
    }
    int item = q->items[q->front];
    if (q->front == q->rear) {
        q->front = -1;
        q->rear = -1;
    } else {
        q->front = (q->front + 1) % MAX_SIZE;
    }
    printf("%d dequeued from the queue\\n", item);
    return item;
}

void display(CircularQueue *q) {
    if (isEmpty(q)) {
        printf("Queue is empty\\n");
        return;
    }
    printf("Queue elements: ");
    int i = q->front;
    do {
        printf("%d ", q->items[i]);
        i = (i + 1) % MAX_SIZE;
    } while (i != (q->rear + 1) % MAX_SIZE);
    printf("\\n");
}

int main() {
    CircularQueue q;
    initializeQueue(&q);

    enqueue(&q, 1);
    enqueue(&q, 2);
    enqueue(&q, 3);
    display(&q);

    dequeue(&q);
    display(&q);

    enqueue(&q, 4);
    enqueue(&q, 5);
    display(&q);

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

