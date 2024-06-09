import { useEffect, useState } from "react";
import usePageBuilderStore from "../_store/pageBuilderStore";

import { useThree } from "../_context/ThreeContext";
import CycleThroughIcon from "../_icons/CycleThroughIcon";

type Position = {
  id: number;
  x: number;
  y: number;
};

const TextureButtons = () => {
  const { camera, renderer } = useThree();
  const { items, editItem } = usePageBuilderStore();
  const [positions, setPositions] = useState<Position[]>([]);

  useEffect(() => {
    const updatePositions = () => {
      const newPositions = items.map((item) => {
        const vector = item.position.clone();
        vector.project(camera);
        const x = (vector.x * 0.5 + 0.5) * renderer.domElement.width;
        const y = (vector.y * -0.5 + 0.5) * renderer.domElement.height;
        return { id: item.id, x, y };
      });
      setPositions(newPositions);
    };

    updatePositions();
  }, [items]);

  return (
    <div>
      {positions.map((position) => (
        <button
          aria-label="Change Texture"
          className="bg-gray-200 rounded-full p-2 border border-black"
          key={position.id}
          style={{
            position: "absolute",
            left: `${position.x - 18}px`,
            top: `${position.y - 100}px`,
          }}
          onClick={() => {
            let selectedItem = items.find((item) => item.id === position.id);
            if (!selectedItem) return;
            selectedItem.filter =
              selectedItem.filter === 2 ? 0 : selectedItem.filter + 1;
            editItem(selectedItem);
          }}
        >
          <CycleThroughIcon height={24} width={24} />
        </button>
      ))}
    </div>
  );
};

export default TextureButtons;
