import React, { useRef, useEffect } from "react";
import { UmlModel } from "../../core/uml/UmlModel";
import { UmlElement } from "../../core/uml/UmlElement";
import { UmlRelationship } from "../../core/uml/UmlRelationship";
import { Position } from "../../utils/geometry/Position";

interface SvgCanvasProps {
  model: UmlModel;
  onElementSelect: (uuid: string) => void;
  onElementMove: (uuid: string, newPosition: Position) => void;
}

export const SvgCanvas: React.FC<SvgCanvasProps> = ({
  model,
  onElementSelect,
  onElementMove,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    model.elements.forEach((element) => {
      drawElement(svg, element, onElementSelect);
    });

    model.relationships.forEach((rel) => {
      drawRelationship(svg, rel, model);
    });
  }, [model]);

  const drawElement = (
    svg: SVGSVGElement,
    element: UmlElement,
    onSelect: (uuid: string) => void,
  ) => {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute("transform", `translate(${element.position.x}, ${element.position.y})`);
    group.setAttribute("data-uuid", element.uuid);

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", element.size.width.toString());
    rect.setAttribute("height", element.size.height.toString());
    rect.setAttribute("fill", "#ffffff");
    rect.setAttribute("stroke", "#000000");
    rect.setAttribute("stroke-width", "1");
    group.appendChild(rect);

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", "5");
    text.setAttribute("y", "15");
    text.setAttribute("font-family", "Arial");
    text.setAttribute("font-size", "12");
    text.textContent = element.name;
    group.appendChild(text);

    if (element.type === "Class") {
      const umlClass = element as any;
      if (umlClass.attributes && umlClass.attributes.length > 0) {
        let y = 30;
        umlClass.attributes.forEach((attr: any) => {
          const attrText = document.createElementNS("http://www.w3.org/2000/svg", "text");
          attrText.setAttribute("x", "5");
          attrText.setAttribute("y", y.toString());
          attrText.setAttribute("font-family", "Arial");
          attrText.setAttribute("font-size", "10");
          attrText.textContent = `${attr.visibility} ${attr.name}: ${attr.type}`;
          group.appendChild(attrText);
          y += 15;
        });
      }
    }

    group.addEventListener("click", (e) => {
      e.stopPropagation();
      onSelect(element.uuid);
    });

    svg.appendChild(group);
  };

  const drawRelationship = (
    svg: SVGSVGElement,
    rel: UmlRelationship,
    model: UmlModel,
  ) => {
    const source = model.getElement(rel.sourceId);
    const target = model.getElement(rel.targetId);
    if (!source || !target) return;

    const sourceX = source.position.x + (rel.sourceAnchor ? rel.sourceAnchor.x : source.size.width / 2);
    const sourceY = source.position.y + (rel.sourceAnchor ? rel.sourceAnchor.y : source.size.height / 2);
    const targetX = target.position.x + (rel.targetAnchor ? rel.targetAnchor.x : target.size.width / 2);
    const targetY = target.position.y + (rel.targetAnchor ? rel.targetAnchor.y : target.size.height / 2);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", sourceX.toString());
    line.setAttribute("y1", sourceY.toString());
    line.setAttribute("x2", targetX.toString());
    line.setAttribute("y2", targetY.toString());
    line.setAttribute("stroke", "#000000");
    line.setAttribute("stroke-width", "1");
    svg.appendChild(line);

    if (rel.type === "Inheritance") {
      drawArrowhead(svg, sourceX, sourceY, targetX, targetY);
    }

    if (rel.label) {
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", ((sourceX + targetX) / 2).toString());
      label.setAttribute("y", ((sourceY + targetY) / 2).toString());
      label.setAttribute("font-family", "Arial");
      label.setAttribute("font-size", "10");
      label.textContent = rel.label;
      svg.appendChild(label);
    }
  };

  const drawArrowhead = (
    svg: SVGSVGElement,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ) => {
    const angle = Math.atan2(y2 - y1, x2 - x1);
    const length = 10;
    const arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
    arrow.setAttribute(
      "d",
      `M ${x2} ${y2} L ${x2 - length * Math.cos(angle - Math.PI / 6)} ${y2 - length * Math.sin(angle - Math.PI / 6)} L ${x2 - length * Math.cos(angle + Math.PI / 6)} ${y2 - length * Math.sin(angle + Math.PI / 6)} Z`,
    );
    arrow.setAttribute("fill", "#000000");
    svg.appendChild(arrow);
  };

  return <svg ref={svgRef} width="100%" height="100%" />;
};
