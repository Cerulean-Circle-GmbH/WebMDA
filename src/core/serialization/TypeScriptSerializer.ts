import { UmlModel } from "../uml/UmlModel";
import { UmlElement } from "../uml/UmlElement";

export class TypeScriptSerializer {
  constructor() {}

  static toTypeScript(model: UmlModel): string {
    let ts = "// Auto-generated TypeScript from UML Model\n\n";

    model.elements.forEach((element) => {
      if (element.type === "Class") {
        ts += this.serializeClass(element);
      }
    });

    return ts;
  }

  static fromTypeScript(ts: string): UmlModel {
    const model = new UmlModel();
    // TODO: Parse TypeScript and extract classes
    return model;
  }

  private static serializeClass(element: UmlElement): string {
    let ts = `class ${element.name} {\n`;
    
    // Add attributes (simplified)
    if (element.type === "Class") {
      const umlClass = element as any;
      if (umlClass.attributes && umlClass.attributes.length > 0) {
        umlClass.attributes.forEach((attr: any) => {
          ts += `  ${attr.visibility} ${attr.name}: ${attr.type};\n`;
        });
      }
      ts += "\n";
      
      // Add methods
      if (umlClass.methods && umlClass.methods.length > 0) {
        umlClass.methods.forEach((method: any) => {
          ts += `  ${method.visibility} ${method.name}(${method.parameters.join(", ")}): ${method.returnType} {}\n`;
        });
      }
    }
    
    ts += "}\n\n";
    return ts;
  }
}
