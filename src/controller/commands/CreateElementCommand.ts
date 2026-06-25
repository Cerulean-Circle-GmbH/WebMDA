import { Command } from "/src/controller/Command";
import { UmlModel } from "/src/core/uml/UmlModel";
import { UmlElement } from "/src/core/uml/UmlElement";

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
