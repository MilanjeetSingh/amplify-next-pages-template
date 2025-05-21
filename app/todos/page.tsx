// @ts-nocheck
import { generateServerClientUsingCookies } from '@aws-amplify/adapter-nextjs/api';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import type { Schema } from '@/amplify/data/resource';
import ClientTodos from './client-todos';
import outputs from '@/amplify_outputs.json';

// Define the proper configuration for server-side
const serverConfig = {
  API: {
    GraphQL: {
      endpoint: outputs.api.ApiName.GraphQL.endpoint,
      region: outputs.api.ApiName.GraphQL.region,
      defaultAuthMode: "apiKey",
      apiKey: outputs.api.ApiName.GraphQL.apiKey
    }
  }
};

// Server action to create a new todo
async function createTodo(formData: FormData) {
  'use server';
  
  // Generate a server client to fetch data server-side
  const serverClient = generateServerClientUsingCookies<Schema>({
    config: serverConfig,
    cookieStorage: cookies(),
  });
  
  const content = formData.get('content') as string;
  
  if (content?.trim()) {
    try {
      if (!serverClient.models?.Todo) {
        throw new Error("Todo model not found in server client");
      }
      
      await serverClient.models.Todo.create({
        content: content.trim(),
      });
    } catch (err) {
      console.error("Error creating todo:", err);
      throw new Error("Failed to create todo");
    }
  }
  
  revalidatePath('/todos');
}

// Define TodoType interface with nullable content
type Nullable<T> = T | null;

interface TodoType {
  id: string;
  content: Nullable<string>;
  createdAt?: string;
  updatedAt?: string;
}

export default async function TodosPage() {
  // Generate a server client to fetch data server-side
  const serverClient = generateServerClientUsingCookies<Schema>({
    config: serverConfig,
    cookieStorage: cookies(),
  });
  
  let todos = [];
  let serverError = null;
  
  // Fetch todos on the server
  try {
    if (!serverClient.models?.Todo) {
      throw new Error("Todo model not found in server client");
    }
    
    const { data, errors } = await serverClient.models.Todo.list();
    todos = data;
    
    if (errors) {
      console.error('Failed to fetch todos:', errors);
      serverError = "Failed to fetch todos";
    }
  } catch (err) {
    console.error("Error fetching todos:", err);
    serverError = "Error fetching todos: " + (err.message || "Unknown error");
  }
  
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Todos (SSR + CSR)</h1>
      <p className="mb-4">This page demonstrates both Server-Side Rendering and Client-Side interactivity</p>
      
      {serverError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{serverError}</p>
        </div>
      )}
      
      {/* Server-rendered form with server action */}
      <form action={createTodo} className="mb-6">
        <div className="flex gap-2">
          <input 
            type="text" 
            name="content" 
            placeholder="Add a new todo..."
            className="border p-2 flex-grow"
            required
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add (Server Action)
          </button>
        </div>
      </form>
      
      {/* Server-rendered list */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Server-Rendered Todos</h2>
        {todos.length === 0 ? (
          <p className="text-gray-500">No todos yet. Add one above!</p>
        ) : (
          <ul className="list-disc pl-5">
            {todos.map((todo: TodoType) => (
              <li key={todo.id} className="mb-1">{todo.content}</li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Client component with initial server data */}
      <div className="border-t pt-4">
        <h2 className="text-xl font-semibold mb-2">Client-Side Interactive Section</h2>
        <ClientTodos initialTodos={todos as TodoType[]} />
      </div>
    </main>
  );
} 