import React, { useState, useEffect, useRef } from "react";
import { UmlModel } from "/src/core/uml/UmlModel";
import { CommandManager } from "/src/controller/CommandManager";
import { SyncManager } from "/src/core/serialization/SyncManager";
import { SvgCanvas } from "/src/view/svg/SvgCanvas";
import { Toolbar } from "/src/view/components/Toolbar";
import { Position } from "/src/utils/geometry/Position";
import { MoveElementCommand } from "/src/controller/commands/MoveElementCommand";
import { TouchHandler } from "/src/view/touch/TouchHandler";

const App: React.FC = () => {
  const [model, setModel] = useState<UmlModel>(new UmlModel());
  const [commandManager] = useState<CommandManager>(new CommandManager());
  const [syncManager] = useState<SyncManager>(new SyncManager());
  const svgRef = useRef<SVGSVGElement>(null);
  const touchHandlerRef = useRef<TouchHandler | null>(null);

  useEffect(() => {
    commandManager.init(model);
    syncManager.updateModel(model);
  }, [model]);

  useEffect(() => {
    if (svgRef.current) {
      const touchHandler = new TouchHandler();
      touchHandler.init(
        svgRef.current,
        model,
        handleElementSelect,
        handleElementMove,
      );
      touchHandlerRef.current = touchHandler;
    }
  }, [svgRef.current, model]);

  const handleElementSelect = (uuid: string) => {
    console.log("Selected:", uuid);
  };

  const updateModel = () => {
    const newModel = new UmlModel();
    newModel.init(model.serialize());
    setModel(newModel);
    syncManager.updateModel(newModel);
  };

  const handleElementMove = (uuid: string, newPosition: Position) => {
    const element = model.getElement(uuid);
    if (element) {
      const oldPosition = new Position().init({
        x: element.position.x,
        y: element.position.y,
      });
      const command = new MoveElementCommand();
      command.init(model, uuid, oldPosition, newPosition);
      commandManager.execute(command);
      updateModel();
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
      <Toolbar model={model} commandManager={commandManager} onModelUpdate={updateModel} />
      <div style={{ width: "100%", height: "calc(100vh - 50px)" }}>
        <SvgCanvas
          ref={svgRef}
          model={model}
          onElementSelect={handleElementSelect}
          onElementMove={handleElementMove}
        />
      </div>
      <div
        style={{
          position: "fixed",
          bottom: "50px",
          right: "10px",
          background: "white",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          maxWidth: "300px",
          maxHeight: "300px",
          overflow: "auto",
          fontSize: "10px",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0" }}>PlantUML</h4>
        <pre>{syncManager.getPlantUml()}</pre>
        <h4 style={{ margin: "10px 0" }}>TypeScript</h4>
        <pre>{syncManager.getTypeScript()}</pre>
      </div>
    </div>
  );
};

export default App;
