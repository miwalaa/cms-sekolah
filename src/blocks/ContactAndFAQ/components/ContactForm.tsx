import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import FormStatusMessages from './FormStatusMessages'
import FormField from './FormField'

interface FormValues {
  fullName: string
  phone: string
  email: string
  message: string
}

interface ContactFormProps {
  fullNameLabel: string
  phoneLabel: string
  emailLabel: string
  messageLabel: string
  submitLabel: string
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
  isLoading: boolean
  hasSubmitted: boolean
  error?: { message: string; status?: number }
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>
}

const ContactForm: React.FC<ContactFormProps> = ({
  fullNameLabel,
  phoneLabel,
  emailLabel,
  messageLabel,
  submitLabel,
  register,
  errors,
  isLoading,
  hasSubmitted,
  error,
  onSubmit,
}) => {
  // Determine form status for messages
  const getFormStatus = (): 'idle' | 'success' | 'error' => {
    if (hasSubmitted) return 'success'
    if (error) return 'error'
    return 'idle'
  }

  const getStatusMessage = (): string => {
    if (hasSubmitted)
      return 'Terima kasih! Pesan Anda telah berhasil dikirim dan akan segera kami proses.'
    if (error) return error.message
    return ''
  }

  return (
    <>
      <FormStatusMessages status={getFormStatus()} message={getStatusMessage()} />

      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <FormField<FormValues>
          label={fullNameLabel}
          name="fullName"
          register={register}
          error={errors.fullName?.message}
          required
          type="text"
          validation={{
            required: 'Nama lengkap wajib diisi',
            validate: (value: string) => value.trim() !== '' || 'Nama lengkap wajib diisi',
          }}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <FormField<FormValues>
            label={phoneLabel}
            name="phone"
            register={register}
            error={errors.phone?.message}
            type="tel"
          />

          <FormField<FormValues>
            label={emailLabel}
            name="email"
            register={register}
            error={errors.email?.message}
            type="email"
            validation={{
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Format email tidak valid',
              },
            }}
          />
        </div>

        <FormField<FormValues>
          label={messageLabel}
          name="message"
          register={register}
          error={errors.message?.message}
          required
          type="textarea"
          rows={5}
          validation={{
            required: 'Pesan wajib diisi',
            validate: (value: string) => value.trim() !== '' || 'Pesan wajib diisi',
          }}
        />

        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full inline-flex items-center justify-center rounded-3xl bg-brand px-5 py-2.5 font-medium text-white shadow-sm hover:opacity-95 disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                Mengirim...
              </>
            ) : (
              submitLabel
            )}
          </button>
        </div>
      </form>
    </>
  )
}

export default ContactForm
