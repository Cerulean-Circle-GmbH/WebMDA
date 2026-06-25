import { Item } from "/src/core/base/Item";
import { UuidGenerator } from "/src/core/base/UuidGenerator";
import { UmlElement } from "/src/core/uml/UmlElement";
import { UmlRelationship } from "/src/core/uml/UmlRelationship";

export class UmlModel extends Item {
  constructor() {
    super();
    this.model = {
      name: "UML Model",
      description: "Root UML model container",
      badge: "",
      icon: "",
      uuid: UuidGenerator.generate(),
      elements: [],
      relationships: [],
    };
  }

  get elements(): UmlElement[] {
    return (this.model.elements as Record<string, unknown>[]).map((el) => {
      const element = new UmlElement();
      element.init(el);
      return element;
    });
  }

  set elements(value: UmlElement[]) {
    this.model.elements = value.map((el) => el.serialize());
  }

  get relationships(): UmlRelationship[] {
    return (this.model.relationships as Record<string, unknown>[]).map((rel) => {
      const relationship = new UmlRelationship();
      relationship.init(rel);
      return relationship;
    });
  }

  set relationships(value: UmlRelationship[]) {
    this.model.relationships = value.map((rel) => rel.serialize());
  }

  addElement(element: UmlElement): void {
    const current = this.elements;
    current.push(element);
    this.elements = current;
  }

  removeElement(uuid: string): void {
    this.elements = this.elements.filter((el) => el.uuid !== uuid);
    this.relationships = this.relationships.filter(
      (rel) => rel.sourceId !== uuid && rel.targetId !== uuid,
    );
  }

  addRelationship(relationship: UmlRelationship): void {
    const current = this.relationships;
    current.push(relationship);
    this.relationships = current;
  }

  getElement(uuid: string): UmlElement | null {
    const found = this.elements.find((el) => el.uuid === uuid);
    return found ? found : null;
  }

  getRelationship(uuid: string): UmlRelationship | null {
    const found = this.relationships.find((rel) => rel.uuid === uuid);
    return found ? found : null;
  }

  serialize(): Record<string, unknown> {
    return {
      ...this.model,
      elements: this.elements.map((el) => el.serialize()),
      relationships: this.relationships.map((rel) => rel.serialize()),
    };
  }

  static deserialize(data: Record<string, unknown>): UmlModel {
    const model = new UmlModel();
    model.init(data);
    return model;
  }
}
