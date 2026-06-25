import { Command } from "./Command";
import { UmlModel } from "../core/uml/UmlModel";

export class CommandManager {
  private undoStack: Command[];
  private redoStack: Command[];
  private model: UmlModel;

  constructor() {
    this.undoStack = [];
    this.redoStack = [];
    this.model = new UmlModel();
  }

  init(model: UmlModel): void {
    this.model = model;
  }

  execute(command: Command): void {
    command.init(this.model);
    command.execute();
    this.undoStack.push(command);
    this.redoStack = [];
  }

  undo(): void {
    const command = this.undoStack.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }

  redo(): void {
    const command = this.redoStack.pop();
    if (command) {
      command.execute();
      this.undoStack.push(command);
    }
  }
}
