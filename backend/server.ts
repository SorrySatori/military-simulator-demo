import { WebSocketServer, WebSocket } from 'ws'
import { getAllUnits, Unit } from './units.js'

interface Message {
  type: string
  data?: any
  action?: string
  message?: string
  timestamp?: string
  clientCount?: number
}

const PORT = (process.env.PORT || 8080) as number
const wss = new WebSocketServer({ port: PORT })

const clients = new Set<WebSocket>()
let units: Unit[] = getAllUnits()

function broadcast(message: Message, sender: WebSocket | null): void {
  clients.forEach(client => {
    if (client !== sender && client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message))
    }
  })
}

function broadcastAll(message: Message): void {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message))
    }
  })
}

wss.on('connection', (ws) => {
  clients.add(ws)
  console.log('Client connected. Total clients:', clients.size)

  ws.send(JSON.stringify({
    type: 'connection',
    message: 'Connected to Military Simulator WebSocket Server',
    timestamp: new Date().toISOString(),
    clientCount: clients.size
  }))

  broadcast({
    type: 'client_joined',
    clientCount: clients.size,
    timestamp: new Date().toISOString()
  }, ws)

  setTimeout(() => {
    ws.send(JSON.stringify({
      type: 'units_data',
      data: units,
      timestamp: new Date().toISOString()
    }))
  }, 1000)

  ws.on('message', (data: Buffer) => {
    try {
      const message: Message = JSON.parse(data.toString())

      switch (message.type) {
        case 'get_units':
          ws.send(JSON.stringify({
            type: 'units_data',
            data: units,
            timestamp: new Date().toISOString()
          }))
          break

        case 'reset_units':
          units = getAllUnits()
          broadcastAll({
            type: 'units_data',
            data: units,
            timestamp: new Date().toISOString()
          })
          break

        default:
          console.error('Unknown message type:', message.type)
      }
    } catch (error: any) {
      console.error('Error parsing message:', error)
      ws.send(JSON.stringify({
        type: 'error',
        message: 'Invalid message format',
        timestamp: new Date().toISOString()
      }))
    }
  })

  ws.on('close', () => {
    clients.delete(ws)
    console.log('Client disconnected. Total clients:', clients.size)
    
    broadcast({
      type: 'client_left',
      clientCount: clients.size,
      timestamp: new Date().toISOString()
    }, null)
  })

  ws.on('error', (error: Error) => {
    console.error('WebSocket error:', error)
    clients.delete(ws)
  })
})

setInterval(() => {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 'heartbeat',
        timestamp: new Date().toISOString(),
        clientCount: clients.size
      }))
    }
  })
}, 30000)

console.log(`WebSocket server is running on ws://localhost:${PORT}`)
console.log('Waiting for connections...')
