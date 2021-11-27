import { Button } from "@laundry/ui";
import React from "react";

export const ClosetTest = () => {
  return (
    <div className="w-[600px] overflow-y-auto">
      <div className="grid auto-cols-[100px] auto-rows-[100px] gap-1 grid-flow-col">
        <div
          style={{ gridRowStart: 1, gridRowEnd: "span 2", gridColumnStart: 1 }}
        >
          <Button className="w-full h-full">Dress</Button>
        </div>
        <div style={{ gridRowStart: 1, gridColumnStart: 2 }}>
          <Button className="w-full h-full">Shirt</Button>
        </div>
        <div style={{ gridRowStart: 1, gridColumnStart: 3 }}>
          <Button className="w-full h-full">Blouse</Button>
        </div>
        <div style={{ gridRowStart: 1, gridColumnStart: 4 }}>
          <Button className="w-full h-full">Blouse</Button>
        </div>
        <div style={{ gridRowStart: 1, gridColumnStart: 5 }}>
          <Button className="w-full h-full">Blouse</Button>
        </div>
        <div style={{ gridRowStart: 1, gridColumnStart: 6 }}>
          <Button className="w-full h-full">Blouse</Button>
        </div>
        <div style={{ gridRowStart: 1, gridColumnStart: 7 }}>
          <Button className="w-full h-full">Blouse</Button>
        </div>
        <div style={{ gridRowStart: 2, gridColumnStart: 2 }}>
          <Button className="w-full h-full">Jeans</Button>
        </div>
        <div style={{ gridRowStart: 2, gridColumnStart: 3 }}>
          <Button className="w-full h-full">Skirt</Button>
        </div>
        <div style={{ gridRowStart: 3, gridColumnStart: 1 }}>
          <Button className="w-full h-full">Briefs</Button>
        </div>
        <div style={{ gridRowStart: 4, gridColumnStart: 1 }}>
          <Button className="w-full h-full">Socks</Button>
        </div>
      </div>
    </div>
  );
};
