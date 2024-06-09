import { useState } from "react";
import usePageBuilderStore, { MediaType } from "../_store/pageBuilderStore";
import * as THREE from "three";
import useSiteStatusStore, { SiteStatusType } from "../_store/siteStatusStore";
import prepareVideo from "../utils/prepareVideo";

const UrlInput: React.FC = () => {
  const [url, setUrl] = useState<string>(``);

  const [error, setError] = useState<string>("");

  const { addItem } = usePageBuilderStore();

  const { siteStatus, setSiteStatus } = useSiteStatusStore();

  const handleSubmit = () => {
    setError("");
    const parsedUrl = url.split("?")[0];
    if (!parsedUrl) {
      setError("Please enter a URL.");
      return;
    } else if (!/\.(mp4|mov|png|jpg|jpeg)$/i.test(parsedUrl)) {
      setError(
        "Supported file types are .mp4, .mov, .png, .jpg, or .jpeg files."
      );
      return;
    }

    setSiteStatus(SiteStatusType.Loading);

    if (/.mp4|.mov$/.test(parsedUrl)) {
      const video = prepareVideo(parsedUrl);

      const texture = new THREE.VideoTexture(video);
      texture.needsUpdate = true;

      video.onloadeddata = () => {
        const aspectRatio = video.videoWidth / video.videoHeight;
        handleTextureLoaded(texture, aspectRatio, MediaType.Video);
      };
      video.onerror = (error) => {
        setSiteStatus(SiteStatusType.Ready);
        setError("Error loading media.");
        console.log(error);
      };
    } else {
      new THREE.TextureLoader().load(
        parsedUrl,
        (texture) => {
          const aspectRatio = texture.image.width / texture.image.height;
          handleTextureLoaded(texture, aspectRatio, MediaType.Image);
        },
        (progress) => console.log(progress),
        (error) => {
          setSiteStatus(SiteStatusType.Ready);
          setError(
            "Error loading media. Is the link valid a valid image or video?"
          );
          console.log(error);
        }
      );
    }
    setUrl("");
  };

  const handleTextureLoaded = (
    texture: THREE.Texture,
    aspectRatio: number,
    type: MediaType
  ) => {
    setSiteStatus(SiteStatusType.Ready);
    addItem({
      id: Date.now(),
      position: new THREE.Vector3(0, 0, 0),
      rotation: new THREE.Vector3(0, 0, 0),
      texture,
      type,
      aspectRatio,
      filter: 0,
    });
  };

  return (
    <div className="absolute  top-4 left-4 w-[880px] flex flex-col">
      <div className="flex">
        <label className="absolute -left-[9999px]" htmlFor="url">
          URL
        </label>
        <input
          className="shadow border bg-white rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="url"
          type="text"
          placeholder="Enter an image or video URL to add it to your canvas"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
          disabled={siteStatus === SiteStatusType.Loading}
          className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[200px]"
          onClick={() => handleSubmit()}
        >
          Add Media
        </button>
      </div>
      {error && <p className="text-red-500 mt-4 ml-2">{error}</p>}
    </div>
  );
};

export default UrlInput;
