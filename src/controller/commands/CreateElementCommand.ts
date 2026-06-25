import { Command } from "../Command";
import { UmlModel } from "../../core/uml/UmlModel";
import { UmlElement } from "../../core/uml/UmlElement";

export class CreateElementCommand extends Command {
  private element: UmlElement;

  constructor() {
    super();
    this.element = new UmlElement();
  }

  init(model: UmlModel, element: UmlElement): void {
    super.init(model);
    this.element = element;
  }

  execute(): void {
    this.model.addElement(this.element);
  }

  undo(): void {
    this.model.removeElement(this.element.uuid);
  }
}
