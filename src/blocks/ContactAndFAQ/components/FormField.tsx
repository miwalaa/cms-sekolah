import React from 'react'
import { UseFormRegister, RegisterOptions, FieldValues, Path } from 'react-hook-form'

interface FormFieldProps<TFieldValues extends FieldValues = FieldValues> {
  label: string
  name: Path<TFieldValues>
  register?: UseFormRegister<TFieldValues>
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  error?: string
  required?: boolean
  type?: 'text' | 'email' | 'tel' | 'textarea'
  rows?: number
  placeholder?: string
  validation?: RegisterOptions<TFieldValues>
}

const FormField = <TFieldValues extends FieldValues = FieldValues>({
  label, 
  name, 
  register,
  value, 
  onChange, 
  error, 
  required = false, 
  type = 'text',
  rows = 3,
  placeholder = '',
  validation
}: FormFieldProps<TFieldValues>): React.ReactElement => {
  const hasError = Boolean(error)
  const borderClass = hasError ? 'border-red-500' : 'border-gray-300'
  
  const inputClasses = `w-full rounded-lg border ${borderClass} px-4 py-2 focus:border-primary focus:outline-none`
  
  // If register is provided, use react-hook-form
  if (register) {
    const registerProps = register(name, {
      required: required ? 'Field ini wajib diisi' : false,
      ...validation
    })
    
    return (
      <div>
        <label className="mb-1 block text-sm font-medium text-gray-700">
          {label}{required && ' *'}
        </label>
        
        {type === 'textarea' ? (
          <textarea
            {...registerProps}
            rows={rows}
            placeholder={placeholder}
            className={inputClasses}
          />
        ) : (
          <input
            type={type}
            {...registerProps}
            placeholder={placeholder}
            className={inputClasses}
          />
        )}
        
        {error && (
          <p className="mt-1 text-sm text-red-600">{error}</p>
        )}
      </div>
    )
  }
  
  // Fallback to manual control if register is not provided
  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-gray-700">
        {label}{required && ' *'}
      </label>
      
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={rows}
          placeholder={placeholder}
          className={inputClasses}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={inputClasses}
        />
      )}
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

export default FormField
