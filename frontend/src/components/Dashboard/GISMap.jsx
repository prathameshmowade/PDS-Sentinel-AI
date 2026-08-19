import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { 
  Compass, 
  Layers, 
  MapPin, 
  Truck, 
  ShieldAlert, 
  Building, 
  Maximize2,
  Navigation,
  Eye
} from 'lucide-react';

export default function GISMap({ fpsList = [], trucks = [], onSelectFPS, onSelectAlert, selectedFPSId, theme = 'light' }) {
  const mapContainerRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const tileLayerRef = useRef(null);
  const markersRef = useRef([]);

  const [layerFilters, setLayerFilters] = useState({
    showDepots: true,
    showFPS: true,
    showTrucks: true,
    showRoutes: true
  });

  // Handle map instance & tile layers
  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapInstanceRef.current) {
      const map = L.map(mapContainerRef.current, {
        center: [21.1458, 79.0882],
        zoom: 12,
        zoomControl: false,
        attributionControl: false
      });

      L.control.zoom({ position: 'bottomright' }).addTo(map);
      mapInstanceRef.current = map;
    }

    const map = mapInstanceRef.current;

    // Update tile layer based on theme
    if (tileLayerRef.current) {
      tileLayerRef.current.remove();
    }

    const tileUrl = theme === 'dark'
      ? 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
      : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    tileLayerRef.current = L.tileLayer(tileUrl, {
      maxZoom: 19,
      subdomains: 'abcd',
    }).addTo(map);

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // 1. Add FCI Central Depots (Warehouses)
    if (layerFilters.showDepots) {
      const depots = [
        { id: "DEPOT-01", name: "FCI Central Depot - Ajni", lat: 21.1215, lng: 79.0820, stock: "15,000 MT" },
        { id: "DEPOT-02", name: "State Logistics Hub - Hingna MIDC", lat: 21.0945, lng: 78.9890, stock: "10,000 MT" },
        { id: "DEPOT-03", name: "Kamptee Regional Buffer Silo", lat: 21.2230, lng: 79.1980, stock: "8,000 MT" }
      ];

      depots.forEach(depot => {
        const depotIcon = L.divIcon({
          className: 'custom-depot-marker',
          html: `
            <div style="background:#0284c7; width:30px; height:30px; border-radius:6px; border:2px solid #ffffff; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,0.3); cursor:pointer;">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
          `,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        const marker = L.marker([depot.lat, depot.lng], { icon: depotIcon }).addTo(map);
        marker.bindPopup(`
          <div style="padding:10px 12px; font-family:sans-serif; background:#0f172a; color:#f8fafc; min-width:210px;">
            <div style="font-size:9px; font-weight:700; color:#38bdf8; text-transform:uppercase; letter-spacing:0.05em;">FCI Strategic Buffer Depot</div>
            <div style="font-size:13px; font-weight:700; color:#ffffff; margin-top:2px;">${depot.name}</div>
            <div style="font-size:11px; color:#94a3b8; margin-top:4px; font-family:monospace;">Capacity: <b style="color:#ffffff">${depot.stock}</b></div>
            <div style="margin-top:6px; padding-top:6px; border-top:1px solid #334155; font-size:10px; color:#10b981; font-weight:600; display:flex; align-items:center;">
              <span style="display:inline-block; width:6px; height:6px; border-radius:50%; background:#10b981; margin-right:6px;"></span>
              Electronic Weighbridge Operational
            </div>
          </div>
        `);
        markersRef.current.push(marker);
      });
    }

    // 2. Add Fair Price Shops
    if (layerFilters.showFPS) {
      fpsList.forEach(fps => {
        let color = '#059669'; // Emerald
        let pulseClass = '';

        if (fps.risk_level === 'CRITICAL') {
          color = '#dc2626'; // Red
          pulseClass = 'radar-marker';
        } else if (fps.risk_level === 'HIGH' || fps.risk_level === 'MEDIUM') {
          color = '#d97706'; // Amber
        }

        const fpsIcon = L.divIcon({
          className: 'custom-fps-marker',
          html: `
            <div class="${pulseClass}" style="background:${color}; width:26px; height:26px; border-radius:50%; border:2px solid #ffffff; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 6px rgba(0,0,0,0.35); cursor:pointer;">
              <span style="font-size:9px; font-weight:700; color:#ffffff; font-family:monospace;">${Math.round(fps.trust_score)}</span>
            </div>
          `,
          iconSize: [26, 26],
          iconAnchor: [13, 13]
        });

        const marker = L.marker([fps.lat, fps.lng], { icon: fpsIcon }).addTo(map);

        marker.on('click', () => {
          if (onSelectFPS) onSelectFPS(fps.id);
        });

        marker.bindPopup(`
          <div style="padding:10px 12px; font-family:sans-serif; background:#0f172a; color:#f8fafc; min-width:220px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
              <span style="font-size:9px; font-weight:700; color:${color}; text-transform:uppercase; letter-spacing:0.05em;">${fps.risk_level} RISK TIER</span>
              <span style="font-size:10px; font-weight:700; font-family:monospace; background:#1e293b; color:#ffffff; padding:1px 6px; border-radius:3px;">Score: ${fps.trust_score}</span>
            </div>
            <div style="font-size:13px; font-weight:700; color:#ffffff;">${fps.name}</div>
            <div style="font-size:11px; color:#94a3b8; margin-top:2px;">License: ${fps.license_no}</div>
            <div style="font-size:11px; color:#94a3b8;">Dealer: ${fps.dealer_name}</div>
            <div style="margin-top:6px; padding-top:6px; border-top:1px solid #334155; font-size:10px; color:#cbd5e1; font-family:monospace;">
              Stock: Rice ${fps.current_stock_mt?.rice || 0} MT | Wheat ${fps.current_stock_mt?.wheat || 0} MT
            </div>
          </div>
        `);

        markersRef.current.push(marker);
      });
    }

    // 3. Add Live GPS Delivery Trucks & Corridors
    if (layerFilters.showTrucks) {
      trucks.forEach(truck => {
        const isBreach = truck.geofence_breach || truck.status === 'ANOMALY_ROUTE_DEVIATION';
        const truckColor = isBreach ? '#dc2626' : '#0284c7';

        const truckIcon = L.divIcon({
          className: 'custom-truck-marker',
          html: `
            <div style="background:${truckColor}; width:28px; height:28px; border-radius:6px; border:2px solid #ffffff; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 8px rgba(0,0,0,0.35);">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
          `,
          iconSize: [28, 28],
          iconAnchor: [14, 14]
        });

        const marker = L.marker([truck.current_lat, truck.current_lng], { icon: truckIcon }).addTo(map);
        
        marker.bindPopup(`
          <div style="padding:10px 12px; font-family:sans-serif; background:#0f172a; color:#f8fafc; min-width:230px;">
            <div style="font-size:9px; font-weight:700; color:${truckColor}; text-transform:uppercase; letter-spacing:0.05em;">
              ${isBreach ? '⚠️ GEOFENCE BREACH ALERT' : '● GPS IN-TRANSIT TELEMETRY'}
            </div>
            <div style="font-size:13px; font-weight:700; color:#ffffff; margin-top:2px;">${truck.reg_no}</div>
            <div style="font-size:11px; color:#94a3b8;">Driver: ${truck.driver_name} (${truck.driver_phone})</div>
            <div style="font-size:11px; color:#cbd5e1; margin-top:4px; font-family:monospace;">
              Speed: <b>${truck.speed_kmh} km/h</b> • Weight: <b>${truck.current_estimated_weight_mt} MT</b>
            </div>
            ${isBreach ? `
              <div style="margin-top:6px; background:#450a0a; border:1px solid #7f1d1d; color:#fca5a5; padding:6px; border-radius:4px; font-size:10px; line-height:1.3;">
                <b>Breach Location:</b> ${truck.unauthorized_stop_location}<br/>
                ${truck.anomaly_reason}
              </div>
            ` : ''}
          </div>
        `);

        markersRef.current.push(marker);

        // Draw route corridor
        if (layerFilters.showRoutes) {
          const lineCoords = [
            [21.1215, 79.0820], // Depot
            [truck.current_lat, truck.current_lng]
          ];

          const polyline = L.polyline(lineCoords, {
            color: isBreach ? '#dc2626' : '#0284c7',
            weight: 2.5,
            opacity: 0.85,
            dashArray: isBreach ? '3, 6' : '5, 5'
          }).addTo(map);

          markersRef.current.push(polyline);
        }
      });
    }

  }, [fpsList, trucks, selectedFPSId, layerFilters, theme]);

  return (
    <div className="relative w-full h-[520px] rounded-xl overflow-hidden theme-card shadow-sm">
      
      {/* Top Left: Tactical Header */}
      <div className="absolute top-3 left-3 z-[1000] flex items-center space-x-2 bg-white/90 dark:bg-[#0b0f17]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 text-xs shadow-sm">
        <Navigation className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
        <span className="font-semibold text-slate-800 dark:text-slate-200">Nagpur Civil Supplies Grid</span>
        <span className="text-slate-300 dark:text-slate-700">|</span>
        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse"></span>
          REAL-TIME TELEMETRY
        </span>
      </div>

      {/* Top Right: Layer Toggles */}
      <div className="absolute top-3 right-3 z-[1000] flex items-center space-x-1 bg-white/90 dark:bg-[#0b0f17]/90 backdrop-blur-md p-1 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] font-mono shadow-sm">
        <button
          onClick={() => setLayerFilters(prev => ({ ...prev, showFPS: !prev.showFPS }))}
          className={`px-2 py-1 rounded transition-colors ${layerFilters.showFPS ? 'bg-emerald-50 dark:bg-slate-800 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200 dark:border-slate-700' : 'text-slate-500'}`}
        >
          FPS ({fpsList.length})
        </button>
        <button
          onClick={() => setLayerFilters(prev => ({ ...prev, showTrucks: !prev.showTrucks }))}
          className={`px-2 py-1 rounded transition-colors ${layerFilters.showTrucks ? 'bg-sky-50 dark:bg-slate-800 text-sky-700 dark:text-sky-400 font-bold border border-sky-200 dark:border-slate-700' : 'text-slate-500'}`}
        >
          TRUCKS ({trucks.length})
        </button>
        <button
          onClick={() => setLayerFilters(prev => ({ ...prev, showDepots: !prev.showDepots }))}
          className={`px-2 py-1 rounded transition-colors ${layerFilters.showDepots ? 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold border border-slate-300 dark:border-slate-700' : 'text-slate-500'}`}
        >
          DEPOTS (3)
        </button>
      </div>

      {/* Bottom Left: Map Legend */}
      <div className="absolute bottom-3 left-3 z-[1000] bg-white/90 dark:bg-[#0b0f17]/90 backdrop-blur-md p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-[10px] font-sans shadow-sm space-y-1">
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 border border-white"></span>
          <span className="text-slate-700 dark:text-slate-300">Verified FPS (Score ≥ 80)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-white"></span>
          <span className="text-slate-700 dark:text-slate-300">Moderate Risk (55-79)</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 border border-white"></span>
          <span className="text-rose-600 dark:text-rose-300 font-semibold">Critical Anomaly / Breach</span>
        </div>
      </div>

      {/* Leaflet Map DOM Node */}
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  );
}

// Sync step: 247

// Sync step: 279

// Sync step: 293

// Sync step: 331

// Sync step: 247

// Sync step: 279

// Sync step: 293
