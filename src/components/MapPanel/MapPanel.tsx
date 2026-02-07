import { useEffect, useRef } from 'react'
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

const MapPanel = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<Map | null>(null)
  const vectorSourceRef = useRef<VectorSource | null>(null)
  const setSelectedEntity = useSimulationStore((state) => state.setSelectedEntity)
  const entities = useSimulationStore((state) => state.entities)

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
          setSelectedEntity(entity)
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
  }, [setSelectedEntity])

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
      </div>
    </div>
  )
}

export default MapPanel