import { useState } from 'react'

type PanelType = 'controls' | 'unit' | 'log'

export const usePanelDragDrop = (initialOrder: PanelType[] = ['controls', 'unit', 'log']) => {
  const [panelOrder, setPanelOrder] = useState<PanelType[]>(initialOrder)
  const [draggedPanel, setDraggedPanel] = useState<PanelType | null>(null)
  const [dragOverPanel, setDragOverPanel] = useState<PanelType | null>(null)

  const handleDragStart = (panel: PanelType) => {
    setDraggedPanel(panel)
  }

  const handleDragOver = (event: React.DragEvent, panel: PanelType) => {
    event.preventDefault()
    if (draggedPanel && draggedPanel !== panel) {
      setDragOverPanel(panel)
    }
  }

  const handleDragLeave = () => {
    setDragOverPanel(null)
  }

  const handleDrop = (targetPanel: PanelType) => {
    if (!draggedPanel || draggedPanel === targetPanel) {
      setDraggedPanel(null)
      setDragOverPanel(null)
      return
    }

    const newOrder = [...panelOrder]
    const draggedIndex = newOrder.indexOf(draggedPanel)
    const targetIndex = newOrder.indexOf(targetPanel)

    newOrder.splice(draggedIndex, 1)
    newOrder.splice(targetIndex, 0, draggedPanel)

    setPanelOrder(newOrder)
    setDraggedPanel(null)
    setDragOverPanel(null)
  }

  const handleDragEnd = () => {
    setDraggedPanel(null)
    setDragOverPanel(null)
  }

  return {
    panelOrder,
    draggedPanel,
    dragOverPanel,
    handleDragStart,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleDragEnd
  }
}
