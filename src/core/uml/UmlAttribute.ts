import { Item } from "../base/Item";
import { UuidGenerator } from "../base/UuidGenerator";

export class UmlAttribute extends Item {
  constructor() {
    super();
    this.model = {
      name: "",
      description: "",
      badge: "",
      icon: "",
      uuid: UuidGenerator.generate(),
      type: "",
      visibility: "private",
    };
  }

  get type(): string {
    return this.model.type as string;
  }

  set type(value: string) {
    this.model.type = value;
  }

  get visibility(): string {
    return this.model.visibility as string;
  }

  set visibility(value: string) {
    this.model.visibility = value;
  }
}
