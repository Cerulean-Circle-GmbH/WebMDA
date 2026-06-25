import { Item } from "../base/Item";
import { UuidGenerator } from "../base/UuidGenerator";

export class UmlMethod extends Item {
  constructor() {
    super();
    this.model = {
      name: "",
      description: "",
      badge: "",
      icon: "",
      uuid: UuidGenerator.generate(),
      returnType: "",
      visibility: "public",
      parameters: [],
    };
  }

  get returnType(): string {
    return this.model.returnType as string;
  }

  set returnType(value: string) {
    this.model.returnType = value;
  }

  get visibility(): string {
    return this.model.visibility as string;
  }

  set visibility(value: string) {
    this.model.visibility = value;
  }

  get parameters(): string[] {
    return this.model.parameters as string[];
  }

  set parameters(value: string[]) {
    this.model.parameters = value;
  }
}
