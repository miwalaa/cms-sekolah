'use client'

import React, { useEffect, useRef, useState } from 'react'
import type { Map as LeafletMap, Icon as LeafletIcon } from 'leaflet'
import type * as LeafletNamespace from 'leaflet'

export type Props = {
  title?: string
  latitude: number
  longitude: number
  zoom?: number
  label?: string
  className?: string
}

export default function MapBlockComponent({
  title,
  latitude,
  longitude,
  zoom = 10,
  label = 'PKBM INTAN - Sekolah Kesetaraan Bandung',
  className,
}: Props) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const cleanupRef = useRef<(() => void) | null>(null)
  const [initError, setInitError] = useState<string | null>(null)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [overlayMessage, setOverlayMessage] = useState('')
  const ctrlZoomTimeoutRef = useRef<number | null>(null)
  const overlayHideTimeoutRef = useRef<number | null>(null)

  useEffect(() => {
    let isMounted = true

    async function initMap() {
      try {
        const leaflet = await import('leaflet')
        const L = leaflet.default || (leaflet as typeof LeafletNamespace)

        // Load Leaflet CSS via JS (fallback if not globally imported)
        const id = 'leaflet-css-injector'
        if (!document.getElementById(id)) {
          const link = document.createElement('link')
          link.id = id
          link.rel = 'stylesheet'
          link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'
          link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY='
          link.crossOrigin = ''
          document.head.appendChild(link)
        }

        if (!isMounted || !mapContainerRef.current) return

        // Delete the default icon to force re-creation
        delete (L.Icon.Default.prototype as any)._getIconUrl

        // Fix default marker icons when bundling - set imagePath
        L.Icon.Default.mergeOptions({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        })

        // Initialize map if not already created
        if (!mapRef.current) {
          const isTouch =
            typeof window !== 'undefined' &&
            ('ontouchstart' in window || navigator.maxTouchPoints > 0)
          mapRef.current = L.map(mapContainerRef.current, {
            scrollWheelZoom: false, // disable scroll zoom by default
            zoomControl: true,
            dragging: !isTouch, // on mobile, require two fingers (we'll manage manually)
            touchZoom: !isTouch, // disable single-finger pinch until two fingers detected
          }).setView([latitude, longitude], zoom)

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          }).addTo(mapRef.current)

          L.marker([latitude, longitude]).addTo(mapRef.current).bindPopup(label)

          // Desktop: require Ctrl + scroll for zoom
          const containerEl = mapContainerRef.current
          if (containerEl) {
            const wheelHandler = (e: WheelEvent) => {
              const isTouch = navigator.maxTouchPoints > 0
              if (isTouch) return // handled by touch listeners

              if (e.ctrlKey || e.metaKey) {
                // Allow zoom with Ctrl/Cmd + scroll
                if (ctrlZoomTimeoutRef.current) window.clearTimeout(ctrlZoomTimeoutRef.current)
                ctrlZoomTimeoutRef.current = window.setTimeout(() => {
                  if (overlayVisible) setOverlayVisible(false)
                }, 2000)
              } else {
                // Block regular scroll
                e.preventDefault()
                setOverlayMessage('Use Ctrl + scroll to zoom the map')
                setOverlayVisible(true)
                if (overlayHideTimeoutRef.current)
                  window.clearTimeout(overlayHideTimeoutRef.current)
                overlayHideTimeoutRef.current = window.setTimeout(
                  () => setOverlayVisible(false),
                  2000,
                )
              }
            }

            containerEl.addEventListener('wheel', wheelHandler, { passive: true })

            // Mobile: require two fingers to pan/zoom
            const touchStartHandler = (e: TouchEvent) => {
              if (e.touches.length >= 2) {
                // Enable interactions when two fingers used
                if (mapRef.current) {
                  mapRef.current.dragging.enable()
                  mapRef.current.touchZoom.enable()
                }
                setOverlayVisible(false)
                setOverlayMessage('')
              } else {
                // Single-finger: show guidance and keep disabled
                if (mapRef.current) {
                  mapRef.current.dragging.disable()
                  mapRef.current.touchZoom.disable()
                }
                setOverlayMessage('Use two fingers to move the map')
                setOverlayVisible(true)
              }
            }
            const touchEndHandler = (e: TouchEvent) => {
              if (e.touches.length < 2) {
                // back to disabled when not using two fingers
                if (mapRef.current) {
                  mapRef.current.dragging.disable()
                  mapRef.current.touchZoom.disable()
                }
              }
            }
            containerEl.addEventListener('touchstart', touchStartHandler, { passive: true })
            containerEl.addEventListener('touchmove', touchStartHandler, { passive: true })
            containerEl.addEventListener('touchend', touchEndHandler, { passive: true })

            // Cleanup listeners on unmount
            const cleanup = () => {
              containerEl.removeEventListener('wheel', wheelHandler)
              containerEl.removeEventListener('touchstart', touchStartHandler)
              containerEl.removeEventListener('touchmove', touchStartHandler)
              containerEl.removeEventListener('touchend', touchEndHandler)
            }
            cleanupRef.current = cleanup
          }
        } else {
          mapRef.current.setView([latitude, longitude], zoom)
        }
      } catch (err: unknown) {
        console.error('Failed to initialize Leaflet map:', err)
        setInitError(err instanceof Error ? err.message : 'Failed to load map library')
      }
    }

    initMap()

    return () => {
      isMounted = false
      if (cleanupRef.current) cleanupRef.current()
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      if (ctrlZoomTimeoutRef.current) window.clearTimeout(ctrlZoomTimeoutRef.current)
      if (overlayHideTimeoutRef.current) window.clearTimeout(overlayHideTimeoutRef.current)
    }
  }, [latitude, longitude, zoom, label, overlayVisible])

  return (
    <section className={className}>
      <div>
        {title ? (
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl">{title}</h2>
        ) : null}
        <div className="custom-embed-map relative w-full overflow-hidden border border-gray-200 shadow-sm">
          {initError ? (
            <div className="flex h-[72px] w-full items-center justify-center bg-red-50 text-sm text-red-700">
              {initError}. Make sure the &quot;leaflet&quot; package is installed.
            </div>
          ) : null}
          {overlayVisible && !initError ? (
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <span className="px-3 text-center text-sm font-medium text-white">
                {overlayMessage}
              </span>
            </div>
          ) : null}
          <div ref={mapContainerRef} className="h-[525px] w-full" />
        </div>
      </div>
    </section>
  )
}
