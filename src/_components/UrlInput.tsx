import { useState } from "react";
import usePageBuilderStore, { MediaType } from "../_store/pageBuilderStore";
import * as THREE from "three";
const UrlInput = () => {
  const [url, setUrl] = useState<string>("");
  const { addItem, items } = usePageBuilderStore();

  const handleSubmit = () => {
    //TODO Add URL Validation
    addItem({
      id: Date.now(),
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Vector3(0, 0, 0),
      type: MediaType.Image,
      url: url,
    });
    setUrl("");
  };

  console.log(items);

  return (
    <div className="absolute  top-4 left-4 w-[480px] flex">
      <label className="absolute -left-[9999px]" htmlFor="url">
        URL
      </label>
      <input
        className="shadow border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="url"
        type="text"
        placeholder="Media URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[200px]"
        onClick={() => handleSubmit()}
      >
        Add Media
      </button>
    </div>
  );
};

export default UrlInput;
