"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import CodeBlock from "@/components/CodeBlock"

const MAX_SIZE = 5

export default function DequePage() {
  const [deque, setDeque] = useState<string[]>([])
  const [inputValue, setInputValue] = useState("")

  const addFront = () => {
    if (inputValue.trim() !== "") {
      if (deque.length >= MAX_SIZE) {
        alert("Deque is full!")
        return
      }
      setDeque([inputValue.trim(), ...deque])
      setInputValue("")
    }
  }

  const addRear = () => {
    if (inputValue.trim() !== "") {
      if (deque.length >= MAX_SIZE) {
        alert("Deque is full!")
        return
      }
      setDeque([...deque, inputValue.trim()])
      setInputValue("")
    }
  }

  const removeFront = () => {
    if (deque.length > 0) {
      setDeque(deque.slice(1))
    } else {
      alert("Deque is empty!")
    }
  }

  const removeRear = () => {
    if (deque.length > 0) {
      setDeque(deque.slice(0, -1))
    } else {
      alert("Deque is empty!")
    }
  }

  const getDescription = () => {
    const size = deque.length
    if (size === 0) {
      return "The double-ended queue (deque) is currently empty. You can add elements to both the front and rear of the deque."
    } else if (size === MAX_SIZE) {
      return "The deque is full. You need to remove an element before you can add more."
    } else {
      return `The deque contains ${size} element${
        size > 1 ? "s" : ""
      }. You can add or remove elements from both ends of the deque.`
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold mb-4">Double-ended Queue (Deque)</h2>
      <div className="space-y-4">
        <div className="flex space-x-2">
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter item"
            className="bg-background text-foreground"
          />
          <Button onClick={addFront} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Add Front
          </Button>
          <Button onClick={addRear} className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
            Add Rear
          </Button>
          <Button onClick={removeFront} className="bg-accent text-accent-foreground hover:bg-accent/90">
            Remove Front
          </Button>
          <Button onClick={removeRear} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Remove Rear
          </Button>
        </div>
        <div className="bg-background p-4 rounded-lg border border-border">
          <h3 className="text-lg font-semibold mb-2 text-primary">Current Deque:</h3>
          <div className="flex justify-center items-center h-20">
            {deque.map((item, index) => (
              <motion.div
                key={index}
                className="w-16 h-16 flex items-center justify-center bg-primary text-primary-foreground rounded-lg border-2 border-secondary mx-1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {item}
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
    int items[MAX_SIZE];
    int front;
    int rear;
    int size;
} Deque;

void initializeDeque(Deque *d) {
    d->front = -1;
    d->rear = 0;
    d->size = 0;
}

int isFull(Deque *d) {
    return d->size == MAX_SIZE;
}

int isEmpty(Deque *d) {
    return d->size == 0;
}

void addFront(Deque *d, int value) {
    if (isFull(d)) {
        printf("Deque is full!\\n");
        return;
    }
    if (d->front == -1) {
        d->front = 0;
        d->rear = 0;
    } else if (d->front == 0) {
        d->front = MAX_SIZE - 1;
    } else {
        d->front--;
    }
    d->items[d->front] = value;
    d->size++;
    printf("%d added to the front\\n", value);
}

void addRear(Deque *d, int value) {
    if (isFull(d)) {
        printf("Deque is full!\\n");
        return;
    }
    if (d->front == -1) {
        d->front = 0;
        d->rear = 0;
    } else if (d->rear == MAX_SIZE - 1) {
        d->rear = 0;
    } else {
        d->rear++;
    }
    d->items[d->rear] = value;
    d->size++;
    printf("%d added to the rear\\n", value);
}

int removeFront(Deque *d) {
    if (isEmpty(d)) {
        printf("Deque is empty!\\n");
        return -1;
    }
    int item = d->items[d->front];
    if (d->front == d->rear) {
        d->front = -1;
        d->rear = -1;
    } else if (d->front == MAX_SIZE - 1) {
        d->front = 0;
    } else {
        d->front++;
    }
    d->size--;
    printf("%d removed from the front\\n", item);
    return item;
}

int removeRear(Deque *d) {
    if (isEmpty(d)) {
        printf("Deque is empty!\\n");
        return -1;
    }
    int item = d->items[d->rear];
    if (d->front == d->rear) {
        d->front = -1;
        d->rear = -1;
    } else if (d->rear == 0) {
        d->rear = MAX_SIZE - 1;
    } else {
        d->rear--;
    }
    d->size--;
    printf("%d removed from the rear\\n", item);
    return item;
}

void display(Deque *d) {
    if (isEmpty(d)) {
        printf("Deque is empty\\n");
        return;
    }
    printf("Deque elements: ");
    int i = d->front;
    for (int count = 0; count < d->size; count++) {
        printf("%d ", d->items[i]);
        i = (i + 1) % MAX_SIZE;
    }
    printf("\\n");
}

int main() {
    Deque d;
    initializeDeque(&d);

    addFront(&d, 1);
    addRear(&d, 2);
    addFront(&d, 3);
    display(&d);

    removeFront(&d);
    display(&d);

    removeRear(&d);
    display(&d);

    addRear(&d, 4);
    addFront(&d, 5);
    display(&d);

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

