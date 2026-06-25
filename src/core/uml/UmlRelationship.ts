import { Item } from "/src/core/base/Item";
import { UuidGenerator } from "/src/core/base/UuidGenerator";
import { Position } from "/src/utils/geometry/Position";

export class UmlRelationship extends Item {
  constructor() {
    super();
    this.model = {
      name: "",
      description: "",
      badge: "",
      icon: "",
      uuid: UuidGenerator.generate(),
      type: "",
      sourceId: "",
      targetId: "",
      sourceAnchor: new Position().serialize(),
      targetAnchor: new Position().serialize(),
      label: "",
    };
  }

  get type(): string {
    return this.model.type as string;
  }

  set type(value: string) {
    this.model.type = value;
  }

  get sourceId(): string {
    return this.model.sourceId as string;
  }

  set sourceId(value: string) {
    this.model.sourceId = value;
  }

  get targetId(): string {
    return this.model.targetId as string;
  }

  set targetId(value: string) {
    this.model.targetId = value;
  }

  get sourceAnchor(): Position {
    const pos = new Position();
    pos.init(this.model.sourceAnchor as Record<string, unknown>);
    return pos;
  }

  set sourceAnchor(value: Position) {
    this.model.sourceAnchor = value.serialize();
  }

  get targetAnchor(): Position {
    const pos = new Position();
    pos.init(this.model.targetAnchor as Record<string, unknown>);
    return pos;
  }

  set targetAnchor(value: Position) {
    this.model.targetAnchor = value.serialize();
  }

  get label(): string {
    return this.model.label as string;
  }

  set label(value: string) {
    this.model.label = value;
  }
}
