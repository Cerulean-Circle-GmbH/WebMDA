import { UmlModel } from "/src/core/uml/UmlModel";
import { UmlClass } from "/src/core/uml/UmlClass";
import { UmlRelationship } from "/src/core/uml/UmlRelationship";

export class PlantUmlSerializer {
  constructor() {}

  static toPlantUml(model: UmlModel): string {
    let puml = "@startuml\n";

    model.elements.forEach((element) => {
      if (element.type === "Class") {
        const umlClass = element as UmlClass;
        puml += this.serializeClass(umlClass);
      }
    });

    model.relationships.forEach((rel) => {
      puml += this.serializeRelationship(rel);
    });

    puml += "@enduml";
    return puml;
  }

  static fromPlantUml(puml: string): UmlModel {
    const model = new UmlModel();
    // TODO: Implement full PlantUML parser
    return model;
  }

  private static serializeClass(umlClass: UmlClass): string {
    let puml = `class ${umlClass.name} {\n`;
    umlClass.attributes.forEach((attr) => {
      puml += `  ${attr.visibility} ${attr.name}: ${attr.type}\n`;
    });
    puml += "\n";
    umlClass.methods.forEach((method) => {
      puml += `  ${method.visibility} ${method.name}(${method.parameters.join(", ")}): ${method.returnType}\n`;
    });
    puml += "}\n";
    return puml;
  }

  private static serializeRelationship(rel: UmlRelationship): string {
    const source = rel.sourceId;
    const target = rel.targetId;
    const label = rel.label ? ` : ${rel.label}` : "";

    switch (rel.type) {
      case "Inheritance":
        return `${source} <|-- ${target}${label}\n`;
      case "Implementation":
        return `${source} <|.. ${target}${label}\n`;
      case "Association":
        return `${source} --> ${target}${label}\n`;
      case "Aggregation":
        return `${source} o-- ${target}${label}\n`;
      case "Composition":
        return `${source} *-- ${target}${label}\n`;
      case "Dependency":
        return `${source} ..> ${target}${label}\n`;
      default:
        return `${source} -- ${target}${label}\n`;
    }
  }
}
