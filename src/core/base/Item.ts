export abstract class Item {
  protected model: Record<string, unknown> = {};

  constructor() {}

  init(model: Record<string, unknown>): void {
    this.model = { ...model };
  }

  get name(): string {
    return this.model.name as string;
  }

  set name(value: string) {
    this.model.name = value;
  }

  get description(): string {
    return this.model.description as string;
  }

  set description(value: string) {
    this.model.description = value;
  }

  get badge(): string {
    return this.model.badge as string;
  }

  set badge(value: string) {
    this.model.badge = value;
  }

  get icon(): string {
    return this.model.icon as string;
  }

  set icon(value: string) {
    this.model.icon = value;
  }

  get uuid(): string {
    return this.model.uuid as string;
  }

  set uuid(value: string) {
    this.model.uuid = value;
  }

  serialize(): Record<string, unknown> {
    return { ...this.model };
  }
}
