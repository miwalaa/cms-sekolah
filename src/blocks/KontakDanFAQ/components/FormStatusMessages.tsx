import React from 'react'

interface FormStatusMessagesProps {
  status: 'idle' | 'success' | 'error'
  message: string
}

const FormStatusMessages: React.FC<FormStatusMessagesProps> = ({ status, message }) => {
  if (status === 'idle') return null
  
  const isSuccess = status === 'success'
  const bgColor = isSuccess ? 'bg-green-50' : 'bg-red-50'
  const borderColor = isSuccess ? 'border-green-200' : 'border-red-200'
  const textColor = isSuccess ? 'text-green-800' : 'text-red-800'
  const icon = isSuccess ? '✓' : '✗'
  
  return (
    <div className={`mb-4 rounded-lg ${bgColor} border ${borderColor} p-4`}>
      <p className={`${textColor} font-medium`}>
        {icon} {message || (isSuccess ? 'Pesan Anda telah berhasil dikirim!' : 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.')}
      </p>
    </div>
  )
}

export default FormStatusMessages
