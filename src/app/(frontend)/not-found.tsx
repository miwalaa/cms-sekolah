import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center px-4">
        <p className="text-base font-semibold text-brand">404</p>
        <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
          Maaf, tetapi halaman yang Anda cari tidak ada, telah dihapus, nama berubah, atau sedang
          tidak tersedia sementara
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-brand px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          >
            Kembali ke halaman
          </Link>
        </div>
      </div>
    </div>
  )
}
