'use client'

import React, { useEffect, useRef, useState } from 'react'

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
  const mapRef = useRef<any>(null)
  const [initError, setInitError] = useState<string | null>(null)
  const [overlayVisible, setOverlayVisible] = useState(false)
  const [overlayMessage, setOverlayMessage] = useState('')
  const ctrlZoomTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const overlayHideTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let isMounted = true

    async function initMap() {
      try {
        const leaflet = await import('leaflet')
        const L = leaflet.default || leaflet

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

        // Fix default marker icons when bundling
        const DefaultIcon = L.icon({
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        })
        ;(L as any).Marker.prototype.options.icon = DefaultIcon

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

              if (e.ctrlKey) {
                // allow zoom temporarily
                setOverlayVisible(false)
                setOverlayMessage('')
                mapRef.current.scrollWheelZoom.enable()
                if (ctrlZoomTimeoutRef.current) clearTimeout(ctrlZoomTimeoutRef.current)
                ctrlZoomTimeoutRef.current = setTimeout(() => {
                  mapRef.current?.scrollWheelZoom?.disable()
                }, 1500)
              } else {
                // show guidance overlay; do not hijack page scroll
                setOverlayMessage('Use Ctrl + scroll to zoom the map')
                setOverlayVisible(true)
                if (overlayHideTimeoutRef.current) clearTimeout(overlayHideTimeoutRef.current)
                overlayHideTimeoutRef.current = setTimeout(() => setOverlayVisible(false), 2000)
              }
            }

            containerEl.addEventListener('wheel', wheelHandler, { passive: true })

            // Mobile: require two fingers to pan/zoom
            const touchStartHandler = (e: TouchEvent) => {
              if (e.touches.length >= 2) {
                // Enable interactions when two fingers used
                mapRef.current.dragging.enable()
                mapRef.current.touchZoom.enable()
                setOverlayVisible(false)
                setOverlayMessage('')
              } else {
                // Single-finger: show guidance and keep disabled
                mapRef.current.dragging.disable()
                mapRef.current.touchZoom.disable()
                setOverlayMessage('Use two fingers to move the map')
                setOverlayVisible(true)
              }
            }
            const touchEndHandler = (e: TouchEvent) => {
              if (e.touches.length < 2) {
                // back to disabled when not using two fingers
                mapRef.current.dragging.disable()
                mapRef.current.touchZoom.disable()
              }
            }
            containerEl.addEventListener('touchstart', touchStartHandler, { passive: true })
            containerEl.addEventListener('touchmove', touchStartHandler, { passive: true })
            containerEl.addEventListener('touchend', touchEndHandler, { passive: true })

            // Cleanup listeners on unmount
            const cleanup = () => {
              containerEl.removeEventListener('wheel', wheelHandler as any)
              containerEl.removeEventListener('touchstart', touchStartHandler as any)
              containerEl.removeEventListener('touchmove', touchStartHandler as any)
              containerEl.removeEventListener('touchend', touchEndHandler as any)
            }
            // Store cleanup to map instance for later removal
            ;(mapRef.current as any)._customCleanup = cleanup
          }
        } else {
          mapRef.current.setView([latitude, longitude], zoom)
        }
      } catch (err: any) {
        console.error('Failed to initialize Leaflet map:', err)
        setInitError(err?.message || 'Failed to load map library')
      }
    }

    initMap()

    return () => {
      isMounted = false
      if (mapRef.current) {
        if ((mapRef.current as any)._customCleanup) {
          ;(mapRef.current as any)._customCleanup()
        }
        mapRef.current.remove()
        mapRef.current = null
      }
      if (ctrlZoomTimeoutRef.current) clearTimeout(ctrlZoomTimeoutRef.current)
      if (overlayHideTimeoutRef.current) clearTimeout(overlayHideTimeoutRef.current)
    }
  }, [latitude, longitude, zoom, label])

  return (
    <section className={className}>
      <div>
        {title ? (
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 md:text-3xl">{title}</h2>
        ) : null}
        <div className="custom-embed-map relative w-full overflow-hidden border border-gray-200 shadow-sm">
          {initError ? (
            <div className="flex h-[72px] w-full items-center justify-center bg-red-50 text-sm text-red-700">
              {initError}. Make sure the "leaflet" package is installed.
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
