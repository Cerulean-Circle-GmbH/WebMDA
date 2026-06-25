import { UmlModel } from "../uml/UmlModel";
import { PlantUmlSerializer } from "./PlantUmlSerializer";
import { TypeScriptSerializer } from "./TypeScriptSerializer";

export class SyncManager {
  private model: UmlModel;
  private plantUmlCode: string;
  private typeScriptCode: string;

  constructor() {
    this.model = new UmlModel();
    this.plantUmlCode = "";
    this.typeScriptCode = "";
  }

  updateModel(newModel: UmlModel): void {
    this.model = newModel;
    this.plantUmlCode = PlantUmlSerializer.toPlantUml(this.model);
    this.typeScriptCode = TypeScriptSerializer.toTypeScript(this.model);
  }

  getPlantUml(): string {
    return this.plantUmlCode;
  }

  getTypeScript(): string {
    return this.typeScriptCode;
  }

  loadFromPlantUml(puml: string): void {
    this.model = PlantUmlSerializer.fromPlantUml(puml);
    this.plantUmlCode = puml;
    this.typeScriptCode = TypeScriptSerializer.toTypeScript(this.model);
  }

  loadFromTypeScript(ts: string): void {
    this.model = TypeScriptSerializer.fromTypeScript(ts);
    this.typeScriptCode = ts;
    this.plantUmlCode = PlantUmlSerializer.toPlantUml(this.model);
  }

  getModel(): UmlModel {
    return this.model;
  }
}
