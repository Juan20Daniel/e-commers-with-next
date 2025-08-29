'use client';
import { useState } from "react";
export default function AdminPage() {
  const [open, setOpen] = useState(false);

  const tareas = ["Comprar pan", "Estudiar React", "Hacer ejercicio"];
  return (
    <div className="w-80 mx-auto mt-10 p-4 border rounded-2xl shadow-md">
      {/* Header con título y botón */}
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpen(!open)}>
        <h1 className="text-xl font-bold">Lista de tareas</h1>
        <button className="text-sm px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
          {open ? "Cerrar" : "Abrir"}
        </button>
      </div>

      {/* Contenedor expandible */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          open ? "max-h-40 mt-3" : "max-h-0"
        }`}
      >
        <ul className="list-disc pl-5 space-y-1">
          {tareas.map((tarea, i) => (
            <li key={i}>{tarea}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}