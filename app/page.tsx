"use client";

import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/data";
import { Amplify } from "aws-amplify";
import type { Schema } from "@/amplify/data/resource";
import "./../app/app.css";
import outputs from "@/amplify_outputs.json";
import "@aws-amplify/ui-react/styles.css";

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

// Generate client after configuration
const client = generateClient<Schema>();

// Define TodoType interface with nullable content
type Nullable<T> = T | null;

interface TodoType {
  id: string;
  content: Nullable<string>;
  createdAt?: string;
  updatedAt?: string;
}

export default function App() {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Subscribe to real-time updates
  useEffect(() => {
    try {
      if (!client.models || !client.models.Todo) {
        setError("Todo model not found. Make sure the schema is properly defined.");
        return;
      }

      const subscription = client.models.Todo.observeQuery().subscribe({
        next: (data) => setTodos([...data.items] as TodoType[]),
        error: (err) => {
          console.error("Subscription error:", err);
          setError("Failed to subscribe to todo updates.");
        }
      });
      
      return () => {
        subscription.unsubscribe();
      };
    } catch (err) {
      console.error("Error setting up subscription:", err);
      setError("Failed to set up subscription.");
    }
  }, []);

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
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
    <main className="py-6">
      <h1 className="text-2xl font-bold mb-4">Todo App (Client-Side Only)</h1>
      <p className="mb-4">This page demonstrates client-side rendering with Amplify</p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new todo..."
            className="border p-2 flex-grow"
            required
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Todo
          </button>
        </div>
      </form>
      
      <h2 className="text-xl font-semibold mb-2">My Todos</h2>
      {todos.length === 0 ? (
        <p className="text-gray-500">No todos yet. Add one above!</p>
      ) : (
        <ul className="list-disc pl-5">
          {todos.map((todo) => (
            <li key={todo.id} className="mb-1">{todo.content}</li>
          ))}
        </ul>
      )}
      
      <div className="mt-8 p-4 border-t text-gray-600">
        <p>
          🔄 This page uses client-side rendering only. Try adding a todo and see the 
          real-time updates. Compare this with the <a href="/todos" className="text-blue-500 underline">SSR+CSR page</a>.
        </p>
      </div>
    </main>
  );
}
