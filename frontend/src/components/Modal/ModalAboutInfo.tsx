import Modal from "./Modal"

const ModalAboutInfo: React.FC<{ showAboutModal: boolean; setShowAboutModal: (value: boolean) => void }> = ({ showAboutModal, setShowAboutModal }) => {
    return (

        <Modal
            isOpen={showAboutModal}
            onClose={() => setShowAboutModal(false)}
            title="About Military Simulator"
        >
            <div>
                <p>A real-time tactical military simulation application built with React, TypeScript, and OpenLayers.</p>

                <h3>Features</h3>
                <ul>
                    <li><strong>Real-time Unit Movement:</strong> Units follow predefined routes with realistic speed calculations</li>
                    <li><strong>Combat System:</strong> Automatic engagement when opposing forces come within range</li>
                    <li><strong>Damage & Status Tracking:</strong> Units can be active, damaged, or destroyed</li>
                    <li><strong>NATO Military Symbols:</strong> Authentic military unit representation</li>
                    <li><strong>Interactive Map:</strong> High-performance map rendering with zoom and pan</li>
                    <li><strong>Adjustable Speed:</strong> Control simulation speed from 1x to 100x</li>
                </ul>

                <h3>Technologies</h3>
                <ul>
                    <li>React 19.2 - UI framework</li>
                    <li>TypeScript 5.9 - Type safety</li>
                    <li>OpenLayers 10.7 - Map rendering</li>
                    <li>Zustand 5.0 - State management</li>
                    <li>MilSymbol 3.0 - NATO military symbols</li>
                </ul>

                <h3>🎮 Controls</h3>
                <ul>
                    <li><strong>Play/Pause:</strong> Start or stop the simulation</li>
                    <li><strong>Speed Slider:</strong> Adjust simulation speed</li>
                    <li><strong>Click Units:</strong> View detailed information</li>
                    <li><strong>Drag Panels:</strong> Reorder sidebar panels</li>
                </ul>
            </div>
        </Modal>
    )
}

export default ModalAboutInfo