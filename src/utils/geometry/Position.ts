import { Item } from "/src/core/base/Item";
import { UuidGenerator } from "/src/core/base/UuidGenerator";

export class Position extends Item {
  constructor() {
    super();
    this.model = {
      name: "Position",
      description: "2D position coordinates",
      badge: "",
      icon: "",
      uuid: UuidGenerator.generate(),
      x: 0,
      y: 0,
    };
  }

  get x(): number {
    return this.model.x as number;
  }

  set x(value: number) {
    this.model.x = value;
  }

  get y(): number {
    return this.model.y as number;
  }

  set y(value: number) {
    this.model.y = value;
  }
}
