import React from "react";
import { UmlModel } from "../../core/uml/UmlModel";
import { CommandManager } from "../../controller/CommandManager";
import { CreateElementCommand } from "../../controller/commands/CreateElementCommand";
import { UmlClass } from "../../core/uml/UmlClass";

interface ToolbarProps {
  model: UmlModel;
  commandManager: CommandManager;
}

export const Toolbar: React.FC<ToolbarProps> = ({ model, commandManager }) => {
  const handleAddClass = () => {
    const newClass = new UmlClass();
    newClass.name = "NewClass";
    newClass.description = "A new UML class";
    newClass.position.x = 100 + Math.random() * 200;
    newClass.position.y = 100 + Math.random() * 200;
    newClass.size.width = 150;
    newClass.size.height = 100;

    const command = new CreateElementCommand();
    command.init(model, newClass);
    commandManager.execute(command);
  };

  const handleUndo = () => {
    commandManager.undo();
  };

  const handleRedo = () => {
    commandManager.redo();
  };

  return (
    <div className="toolbar">
      <button onClick={handleAddClass}>Add Class</button>
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
    </div>
  );
};
