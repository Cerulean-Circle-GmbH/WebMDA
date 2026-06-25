import Hammer from "hammerjs";
import { UmlModel } from "/src/core/uml/UmlModel";
import { Position } from "/src/utils/geometry/Position";

export class TouchHandler {
  private hammer: HammerManager;
  private svg: SVGSVGElement;
  private model: UmlModel;
  private onElementSelect: (uuid: string) => void;
  private onElementMove: (uuid: string, newPosition: Position) => void;
  private selectedElement: string | null = null;
  private startPosition: Position | null = null;

  constructor() {
    this.hammer = new Hammer.Manager(document.createElement("div"));
    this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.model = new UmlModel();
    this.onElementSelect = () => {};
    this.onElementMove = () => {};
  }

  init(
    svg: SVGSVGElement,
    model: UmlModel,
    onElementSelect: (uuid: string) => void,
    onElementMove: (uuid: string, newPosition: Position) => void,
  ): void {
    this.svg = svg;
    this.model = model;
    this.onElementSelect = onElementSelect;
    this.onElementMove = onElementMove;
    this.hammer = new Hammer(svg);
    this.setupGestures();
  }

  private setupGestures(): void {
    this.hammer.on("tap", (ev) => {
      const element = this.getElementAtPosition(new Position().init({ x: ev.center.x, y: ev.center.y }));
      if (element) {
        this.onElementSelect(element.uuid);
        this.selectedElement = element.uuid;
      }
    });

    this.hammer.on("panstart", (ev) => {
      const element = this.getElementAtPosition(new Position().init({ x: ev.center.x, y: ev.center.y }));
      if (element) {
        this.selectedElement = element.uuid;
        this.startPosition = new Position().init({ x: element.position.x, y: element.position.y });
      }
    });

    this.hammer.on("panmove", (ev) => {
      if (this.selectedElement && this.startPosition) {
        const element = this.model.getElement(this.selectedElement);
        if (element) {
          const newPosition = new Position().init({
            x: this.startPosition.x + ev.deltaX,
            y: this.startPosition.y + ev.deltaY,
          });
          this.onElementMove(this.selectedElement, newPosition);
        }
      }
    });

    this.hammer.on("panend", () => {
      this.selectedElement = null;
      this.startPosition = null;
    });
  }

  private getElementAtPosition(position: Position): UmlElement | null {
    for (const element of this.model.elements) {
      if (
        position.x >= element.position.x &&
        position.x <= element.position.x + element.size.width &&
        position.y >= element.position.y &&
        position.y <= element.position.y + element.size.height
      ) {
        return element;
      }
    }
    return null;
  }
}
