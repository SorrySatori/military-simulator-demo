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
import { mockEntities } from '../../types/entities'
import ms from 'milsymbol'
import 'ol/ol.css'
import './MapPanel.css'

const MapPanel = () => {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<Map | null>(null)

  useEffect(() => {
    if (!mapRef.current) return

    const vectorSource = new VectorSource()

    mockEntities.forEach(entity => {
      const symbol = new ms.Symbol(entity.natoCode, {
        size: 30
      })
      
      const feature = new Feature({
        geometry: new Point(fromLonLat(entity.position)),
        entity: entity
      })

      feature.setStyle(new Style({
        image: new Icon({
          img: symbol.asCanvas(),
          imgSize: [symbol.getSize().width, symbol.getSize().height]
        })
      }))

      vectorSource.addFeature(feature)

      const routeFeature = new Feature({
        geometry: new LineString(entity.route.map(coord => fromLonLat(coord)))
      })

      routeFeature.setStyle(new Style({
        stroke: new Stroke({
          color: 'rgba(255, 0, 0, 0.6)',
          width: 2,
          lineDash: [5, 5]
        })
      }))

      vectorSource.addFeature(routeFeature)
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
        center: fromLonLat([18.315031623126444, 49.839447794058735]),
        zoom: 13
      })
    })

    map.on('click', (evt) => {
      map.forEachFeatureAtPixel(evt.pixel, (feature) => {
        const entity = feature.get('entity')
        if (entity) {
          console.log('Selected entity:', entity)
        }
      })
    })

    mapInstanceRef.current = map

    return () => {
      map.setTarget(undefined)
    }
  }, [])

  return (
    <div className="panel map-panel">
      <div className="panel-header">Map</div>
      <div className="panel-content map-content">
        <div ref={mapRef} className="map-container"></div>
      </div>
    </div>
  )
}

export default MapPanel