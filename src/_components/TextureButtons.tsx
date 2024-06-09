import React from "react";
import usePageBuilderStore from "../_store/pageBuilderStore";

type Props = {};

const TextureButtons = (props: Props) => {
  const { items } = usePageBuilderStore();
  return (
    <div>
      {items.map((item) => {
        return (
          <button
            className="absolute"
            onClick={() => {
              console.log("click");
            }}
          >
            Change Texture
          </button>
        );
      })}
    </div>
  );
};

export default TextureButtons;
