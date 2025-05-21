"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import type { Schema } from "@/amplify/data/resource";
import outputs from "@/amplify_outputs.json";

// Configure Amplify with specific GraphQL API settings
Amplify.configure({
  API: {
    GraphQL: {
      endpoint: outputs.api.ApiName.GraphQL.endpoint,
      region: outputs.api.ApiName.GraphQL.region,
      defaultAuthMode: "apiKey",
      apiKey: outputs.api.ApiName.GraphQL.apiKey
    }
  }
});

// Generate a client for client-side operations
const client = generateClient<Schema>();

// Define TodoType interface with nullable content
type Nullable<T> = T | null;

interface TodoType {
  id: string;
  content: Nullable<string>;
  createdAt?: string;
  updatedAt?: string;
}

interface ClientTodosProps {
  initialTodos: TodoType[];
}

export default function ClientTodos({ initialTodos }: ClientTodosProps) {
  const [todos, setTodos] = useState<TodoType[]>(initialTodos);
  const [newTodo, setNewTodo] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Subscribe to real-time updates
  useEffect(() => {
    if (!isSubscribed) {
      try {
        if (!client.models || !client.models.Todo) {
          setError("Todo model not found. Make sure the schema is properly defined.");
          return;
        }
        
        const subscription = client.models.Todo.observeQuery().subscribe({
          next: (data) => {
            setTodos([...data.items] as TodoType[]);
          },
          error: (err) => {
            console.error("Subscription error:", err);
            setError("Failed to subscribe to todo updates.");
          }
        });
        
        setIsSubscribed(true);
        
        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error("Error setting up subscription:", err);
        setError("Failed to set up subscription.");
      }
    }
  }, [isSubscribed]);

  // Handle client-side todo creation
  async function handleCreateTodo(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    
    if (newTodo.trim()) {
      try {
        if (!client.models || !client.models.Todo) {
          setError("Todo model not found. Make sure the schema is properly defined.");
          return;
        }
        
        await client.models.Todo.create({
          content: newTodo.trim(),
        });
        setNewTodo("");
      } catch (error) {
        console.error("Error creating todo:", error);
        setError("Failed to create todo. Check console for details.");
      }
    }
  }

  return (
    <div>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleCreateTodo} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo (client-side)..."
            className="border p-2 flex-grow"
            required
          />
          <button 
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add (Client-side)
          </button>
        </div>
      </form>

      <h3 className="font-semibold mb-2">Realtime Todos (Client-side subscription)</h3>
      <ul className="list-disc pl-5">
        {todos.map((todo) => (
          <li key={todo.id} className="mb-1">{todo.content}</li>
        ))}
      </ul>
    </div>
  );
} 