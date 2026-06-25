import { UmlModel } from "../core/uml/UmlModel";

export abstract class Command {
  protected model: UmlModel;

  constructor() {
    this.model = new UmlModel();
  }

  init(model: UmlModel): void {
    this.model = model;
  }

  abstract execute(): void;
  abstract undo(): void;
}
