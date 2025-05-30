"use client"

import type React from "react"

interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

interface CardHeaderProps {
  children: React.ReactNode
  className?: string
}

interface CardContentProps {
  children: React.ReactNode
  className?: string
}

interface CardTitleProps {
  children: React.ReactNode
  className?: string
}

interface CardDescriptionProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = "", onClick }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`} onClick={onClick}>
      {children}
    </div>
  )
}

export const CardHeader: React.FC<CardHeaderProps> = ({ children, className = "" }) => {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>
}

export const CardContent: React.FC<CardContentProps> = ({ children, className = "" }) => {
  return <div className={`px-6 pb-6 ${className}`}>{children}</div>
}

export const CardTitle: React.FC<CardTitleProps> = ({ children, className = "" }) => {
  return <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
}

export const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = "" }) => {
  return <p className={`text-sm text-gray-600 mt-1.5 ${className}`}>{children}</p>
}
