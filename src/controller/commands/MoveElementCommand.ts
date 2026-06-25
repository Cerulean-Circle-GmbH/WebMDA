import { Command } from "../Command";
import { UmlModel } from "../../core/uml/UmlModel";
import { Position } from "../../utils/geometry/Position";

export class MoveElementCommand extends Command {
  private elementId: string;
  private oldPosition: Position;
  private newPosition: Position;

  constructor() {
    super();
    this.elementId = "";
    this.oldPosition = new Position();
    this.newPosition = new Position();
  }

  init(model: UmlModel, elementId: string, oldPosition: Position, newPosition: Position): void {
    super.init(model);
    this.elementId = elementId;
    this.oldPosition = oldPosition;
    this.newPosition = newPosition;
  }

  execute(): void {
    const element = this.model.getElement(this.elementId);
    if (element) {
      element.position = this.newPosition;
    }
  }

  undo(): void {
    const element = this.model.getElement(this.elementId);
    if (element) {
      element.position = this.oldPosition;
    }
  }
}
