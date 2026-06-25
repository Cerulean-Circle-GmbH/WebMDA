import { Item } from "../../core/base/Item";
import { UuidGenerator } from "../../core/base/UuidGenerator";

export class Size extends Item {
  constructor() {
    super();
    this.model = {
      name: "Size",
      description: "2D size dimensions",
      badge: "",
      icon: "",
      uuid: UuidGenerator.generate(),
      width: 0,
      height: 0,
    };
  }

  get width(): number {
    return this.model.width as number;
  }

  set width(value: number) {
    this.model.width = value;
  }

  get height(): number {
    return this.model.height as number;
  }

  set height(value: number) {
    this.model.height = value;
  }
}
