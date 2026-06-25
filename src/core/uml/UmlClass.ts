import { UmlElement } from "/src/core/uml/UmlElement";
import { UmlAttribute } from "/src/core/uml/UmlAttribute";
import { UmlMethod } from "/src/core/uml/UmlMethod";

export class UmlClass extends UmlElement {
  constructor() {
    super();
    this.model.type = "Class";
    this.model.attributes = [];
    this.model.methods = [];
    this.model.isAbstract = false;
  }

  get attributes(): UmlAttribute[] {
    return (this.model.attributes as Record<string, unknown>[]).map((attr) => {
      const attribute = new UmlAttribute();
      attribute.init(attr);
      return attribute;
    });
  }

  set attributes(value: UmlAttribute[]) {
    this.model.attributes = value.map((attr) => attr.serialize());
  }

  get methods(): UmlMethod[] {
    return (this.model.methods as Record<string, unknown>[]).map((method) => {
      const m = new UmlMethod();
      m.init(method);
      return m;
    });
  }

  set methods(value: UmlMethod[]) {
    this.model.methods = value.map((m) => m.serialize());
  }

  get isAbstract(): boolean {
    return this.model.isAbstract as boolean;
  }

  set isAbstract(value: boolean) {
    this.model.isAbstract = value;
  }

  addAttribute(attribute: UmlAttribute): void {
    const current = this.attributes;
    current.push(attribute);
    this.attributes = current;
  }

  addMethod(method: UmlMethod): void {
    const current = this.methods;
    current.push(method);
    this.methods = current;
  }
}
