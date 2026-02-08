import { useEffect, useRef, useState } from 'react'
import Map from 'ol/Map'
import View from 'ol/View'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import LineString from 'ol/geom/LineString'
import { fromLonLat } from 'ol/proj'
import { Style, Icon, Stroke } from 'ol/style'
import type { Entity } from '../../types/entities'
import { useSimulationStore } from '../../store/SimulationStore'
import ms from 'milsymbol'
import 'ol/ol.css'
import './MapPanel.css'

const createEntityStyle = (entity: Entity): Style => {
  const symbol = new ms.Symbol(entity.natoCode, {
    size: 30
  })
  
  return new Style({
    image: new Icon({
      img: symbol.asCanvas() as HTMLCanvasElement,
      imgSize: [symbol.getSize().width, symbol.getSize().height] as [number, number]
    } as any)
  })
}

const createRouteStyle = (entity: Entity): Style => {
  const isDamaged = entity.status === 'damaged'
  
  return new Style({
    stroke: new Stroke({
      color: entity.faction === 'human' 
        ? 'rgba(0, 100, 255, 0.6)'
        : 'rgba(255, 0, 0, 0.6)',
      width: isDamaged ? 1.5 : 2,
      lineDash: [5, 5]
    })
  })
}

interface MapPanelProps {
  measurementMode?: boolean
  onCloseMeasurement?: () => void
}

const MapPanel = ({ measurementMode = false, onCloseMeasurement }: MapPanelProps) => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<Map | null>(null)
  const vectorSourceRef = useRef<VectorSource | null>(null)
  const setSelectedEntity = useSimulationStore((state) => state.setSelectedEntity)
  const entities = useSimulationStore((state) => state.entities)
  const [selectedUnits, setSelectedUnits] = useState<Entity[]>([])
  const [distance, setDistance] = useState<number | null>(null)

  const calculateDistance = (pos1: [number, number], pos2: [number, number]): number => {
    const dx = pos2[0] - pos1[0]
    const dy = pos2[1] - pos1[1]
    const distanceInDegrees = Math.sqrt(dx * dx + dy * dy)
    // Convert degrees to kilometers (approximate)
    const distanceInKm = distanceInDegrees * 111
    return distanceInKm
  }

  useEffect(() => {
    if (!mapRef.current) return

    const vectorSource = new VectorSource()
    vectorSourceRef.current = vectorSource

    entities.forEach(entity => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(entity.position)),
        entity: entity
      })
      
      feature.setId(entity.id)
      feature.setStyle(createEntityStyle(entity))
      vectorSource.addFeature(feature)

      if (entity.route && entity.route.length > 1) {
        const routeFeature = new Feature({
          geometry: new LineString(entity.route.map(coord => fromLonLat(coord)))
        })
        
        routeFeature.setId(`route-${entity.id}`)
        routeFeature.setStyle(createRouteStyle(entity))
        vectorSource.addFeature(routeFeature)
      }
    })

    const vectorLayer = new VectorLayer({
      source: vectorSource
    })

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM()
        }),
        vectorLayer
      ],
      view: new View({
        center: fromLonLat([18.332, 49.852]),
        zoom: 12.5
      })
    })

    map.on('click', (evt) => {
      map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        const entity = feature.get('entity')
        if (entity) {
          if (measurementMode) {
            setSelectedUnits(prev => {
              if (prev.length === 0) {
                return [entity]
              } else if (prev.length === 1) {
                const dist = calculateDistance(prev[0].position, entity.position)
                setDistance(dist)
                return [prev[0], entity]
              } else {
                setDistance(null)
                return [entity]
              }
            })
          } else {
            setSelectedEntity(entity)
          }
        }
      })
    })

    map.on('pointermove', (evt) => {
      const pixel = map.getEventPixel(evt.originalEvent)
      const hit = map.hasFeatureAtPixel(pixel)
      map.getTargetElement().style.cursor = hit ? 'pointer' : ''
    })

    mapInstanceRef.current = map

    return () => {
      map.setTarget(undefined)
    }
  }, [setSelectedEntity, measurementMode])

  useEffect(() => {
    if (!measurementMode) {
      setSelectedUnits([])
      setDistance(null)
    }
  }, [measurementMode])

  useEffect(() => {
    if (!vectorSourceRef.current) return

    entities.forEach(entity => {
      const feature = vectorSourceRef.current!.getFeatureById(entity.id)
      const routeFeature = vectorSourceRef.current!.getFeatureById(`route-${entity.id}`)
      
      if (entity.status === 'destroyed') {
        if (feature) {
          vectorSourceRef.current!.removeFeature(feature)
        }
        if (routeFeature) {
          vectorSourceRef.current!.removeFeature(routeFeature)
        }
      } else if (feature) {
        const geometry = feature.getGeometry() as Point
        geometry.setCoordinates(fromLonLat(entity.position))
        feature.set('entity', entity)
        feature.setStyle(createEntityStyle(entity))
      }
    })
  }, [entities])

  return (
    <div className="panel map-panel">
      <div className="panel-header">
        Tactical Map
        <span style={{ 
          fontSize: '12px', 
          marginLeft: '10px', 
          opacity: 0.7 
        }}>
          🔵 Human Forces | 🔴 Alien Invaders
        </span>
      </div>
      <div className="panel-content map-content">
        <div ref={mapRef} className="map-container"></div>
        {measurementMode && (
          <div className="measurement-overlay">
            <div className="measurement-info">
              <div className="measurement-header">
                <h4>📏 Distance Measurement</h4>
                <button 
                  className="close-measurement-btn" 
                  onClick={onCloseMeasurement}
                  title="Close measurement mode"
                >×</button>
              </div>
              {selectedUnits.length === 0 && <p>Click on the first unit...</p>}
              {selectedUnits.length === 1 && (
                <p>First unit: <strong>{selectedUnits[0].callSign}</strong><br/>Click on the second unit...</p>
              )}
              {selectedUnits.length === 2 && distance !== null && (
                <div>
                  <p><strong>{selectedUnits[0].callSign}</strong> → <strong>{selectedUnits[1].callSign}</strong></p>
                  <p className="distance-result">Distance: <strong>{distance.toFixed(2)} km</strong></p>
                  <button onClick={() => {
                    setSelectedUnits([])
                    setDistance(null)
                  }} className="reset-measurement-btn">Measure Again</button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MapPanel