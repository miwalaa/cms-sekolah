'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import emailjs from '@emailjs/browser'

type FormData = {
  name: string
  email: string
  message: string
}

type ContactFormProps = {
  formTitle?: string
  formPlaceholders?: {
    name?: string
    email?: string
    message?: string
    submit?: string
  }
  onSubmit: (data: FormData) => Promise<void>
  isSubmitting: boolean
  submitStatus: {
    success: boolean
    message: string
  } | null
}

export const ContactForm: React.FC<ContactFormProps> = ({
  formTitle = 'Send a Message',
  formPlaceholders = {
    name: 'Name',
    email: 'E-mail address',
    message: 'Message',
    submit: 'Submit',
  },
  onSubmit,
  isSubmitting,
  submitStatus,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-3xl font-bold text-gray-900 mb-6">{formTitle}</h3>

      {submitStatus && (
        <div
          className={`p-4 mb-6 rounded ${
            submitStatus.success ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            {formPlaceholders.name}
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-brand focus:border-transparent ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {formPlaceholders.email}
          </label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-brand focus:border-transparent ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            {formPlaceholders.message}
          </label>
          <textarea
            id="message"
            rows={4}
            {...register('message', { required: 'Message is required' })}
            className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-brand focus:border-transparent ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-semibold text-white bg-brand hover:bg-brand/95 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 ${
              isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              formPlaceholders.submit
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
