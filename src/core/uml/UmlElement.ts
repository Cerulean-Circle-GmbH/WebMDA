import { Item } from "../base/Item";
import { UuidGenerator } from "../base/UuidGenerator";
import { Position } from "../../utils/geometry/Position";
import { Size } from "../../utils/geometry/Size";

export class UmlElement extends Item {
  constructor() {
    super();
    this.model = {
      name: "",
      description: "",
      badge: "",
      icon: "",
      uuid: UuidGenerator.generate(),
      type: "",
      position: new Position().serialize(),
      size: new Size().serialize(),
    };
  }

  get type(): string {
    return this.model.type as string;
  }

  set type(value: string) {
    this.model.type = value;
  }

  get position(): Position {
    const pos = new Position();
    pos.init(this.model.position as Record<string, unknown>);
    return pos;
  }

  set position(value: Position) {
    this.model.position = value.serialize();
  }

  get size(): Size {
    const size = new Size();
    size.init(this.model.size as Record<string, unknown>);
    return size;
  }

  set size(value: Size) {
    this.model.size = value.serialize();
  }

  init(model: Record<string, unknown>): void {
    super.init(model);
    if (!this.model.uuid) {
      this.model.uuid = UuidGenerator.generate();
    }
    if (!this.model.position) {
      this.model.position = new Position().serialize();
    }
    if (!this.model.size) {
      this.model.size = new Size().serialize();
    }
  }
}
