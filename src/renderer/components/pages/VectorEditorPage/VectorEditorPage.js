import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { isEmpty } from "lodash";

import * as Page from "@/components/lib/layout/pages";
import Navbar from "@/components/lib/layout/navbar/Navbar";

import "./VectorEditorPage.css";

const roundToNearest = (num, denomination = 50) =>
  Math.round(num / denomination) * denomination;

const getNullCoords = () => ({ x: 0, y: 0 });

const getCanvasCoords = (canvasRef) => {
  const canvasDimensions = canvasRef.current.getBoundingClientRect();

  return {
    x: canvasDimensions.x + window.scrollX,
    y: canvasDimensions.y + window.scrollY,
  };
};

const Coords = ({ name, x, y }) => (
  <div style={{ fontSize: "10px" }}>
    <p style={{ padding: 0, margin: 0 }}>{name}</p>
    <span>x: {x}</span>&nbsp;
    <span>y: {y}</span>
  </div>
);

const getRelativeMouseCoords = (mouseCoords, canvasCoords) => {
  return {
    x: roundToNearest(mouseCoords.x - canvasCoords.x, 10),
    y: roundToNearest(mouseCoords.y - canvasCoords.y, 10),
  };
};

const createNewLine = (startCoords) => {
  return { id: uuid(), startCoords, endCoords: startCoords };
};

const VectorEditorPage = () => {
  const canvasRef = useRef(null);

  const [mouseIsDown, setMouseIsDown] = useState(false);
  const [mouseCoords, setMouseCoords] = useState({});

  const [lines, setLines] = useState([]);
  const [newLine, setNewLine] = useState(null);

  const canvasCoords =
    canvasRef && canvasRef.current
      ? getCanvasCoords(canvasRef)
      : getNullCoords();

  const relativeMouseCoords = getRelativeMouseCoords(mouseCoords, canvasCoords);

  return (
    <div className="VectorEditorPage">
      <Navbar>
        <Link className="LinkButton" to="/">
          back
        </Link>
      </Navbar>

      <Page.TitleSection>VectorEditorPage</Page.TitleSection>

      <Page.Section>
        <div>
          <Coords name="canvas" {...canvasCoords} />
          {!isEmpty(relativeMouseCoords) && (
            <Coords name="relative mouse coords" {...relativeMouseCoords} />
          )}
        </div>
        <div
          ref={canvasRef}
          onMouseDown={(e) => {
            setMouseIsDown(true);
            const startCoords = getRelativeMouseCoords(
              { x: e.pageX, y: e.pageY },
              canvasCoords
            );
            setNewLine(createNewLine(startCoords));
          }}
          onMouseUp={(e) => {
            setMouseIsDown(false);
            setLines([...lines, { ...newLine }]);
            setNewLine(null);
          }}
          onMouseMove={(e) => {
            setMouseCoords({ x: e.pageX, y: e.pageY });
            if (mouseIsDown) {
              setNewLine({ ...newLine, endCoords: relativeMouseCoords });
            }
          }}
          style={{
            position: "relative",
            width: "500px",
            height: "500px",
            margin: "10px",
            backgroundColor: "#aaa",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          >
            <svg viewBox="0 0 500 500">
              {lines.map((line) => (
                <line
                  key={line.id}
                  x1={line.startCoords.x}
                  y1={line.startCoords.y}
                  x2={line.endCoords.x}
                  y2={line.endCoords.y}
                  strokeWidth="3"
                  stroke="black"
                />
              ))}
              {newLine && (
                <line
                  x1={newLine.startCoords.x}
                  y1={newLine.startCoords.y}
                  x2={newLine.endCoords.x}
                  y2={newLine.endCoords.y}
                  strokeWidth="3"
                  stroke="red"
                />
              )}
            </svg>
          </div>
        </div>
      </Page.Section>
    </div>
  );
};

export default VectorEditorPage;
