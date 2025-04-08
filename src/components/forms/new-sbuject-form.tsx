"use client"

import type React from "react"
import { useState } from "react"
import { ChevronDown, Plus } from "lucide-react"

export type Subject = {
  id: string
  title: string
  teacher: string
  coefficient: number
  hours: number
  color?: "indigo" | "amber" | "red"
}

interface NewSubjectFormProps {
  onAddSubject: (subject: Omit<Subject, "id" | "color">) => void
}

export default function NewSubjectForm({ onAddSubject }: NewSubjectFormProps) {
  // Form state
  const [title, setTitle] = useState("")
  const [teacher, setTeacher] = useState("")
  const [coefficient, setCoefficient] = useState<number | "">("")
  const [hours, setHours] = useState<number | "">("")

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!title || !teacher || coefficient === "" || hours === "") {
      alert("Veuillez remplir tous les champs")
      return
    }

    // Pass the new subject to parent component
    onAddSubject({
      title,
      teacher,
      coefficient: Number(coefficient),
      hours: Number(hours),
    })

    // Reset form
    setTitle("")
    setTeacher("")
    setCoefficient("")
    setHours("")
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-medium mb-4">Nouvelle Matière:</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="relative">
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none"
            value={teacher}
            onChange={(e) => setTeacher(e.target.value)}
          >
            <option value="" disabled>
              Enseignant
            </option>
            <option value="Mr.Fadhil">Mr.Fadhil</option>
            <option value="Mr.Cyril">Mr.Cyril</option>
            <option value="Mme.Otaumy">Mme.Otaumy</option>
            <option value="Mr.Ahmed">Mr.Ahmed</option>
            <option value="Mme.Sophie">Mme.Sophie</option>
          </select>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            <ChevronDown size={16} className="text-gray-400" />
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Coef"
              min="1"
              max="10"
              value={coefficient}
              onChange={(e) => setCoefficient(e.target.value ? Number(e.target.value) : "")}
            />
          </div>

          <div className="w-1/2">
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="nbr.heures"
              min="1"
              max="20"
              value={hours}
              onChange={(e) => setHours(e.target.value ? Number(e.target.value) : "")}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            <Plus size={16} />
            <span>Ajouter Matière</span>
          </button>
        </div>
      </form>
    </div>
  )
}
