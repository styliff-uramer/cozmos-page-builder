import { useState } from "react";
import usePageBuilderStore, { MediaType } from "../_store/pageBuilderStore";
import * as THREE from "three";
import useSiteStatusStore, { SiteStatusType } from "../_store/siteStatusStore";
const UrlInput = () => {
  const [url, setUrl] = useState<string>(
    `https://imgur.com/gallery/kittens-9p8xPLu`
  );

  const [error, setError] = useState<string>("");

  const { addItem, items } = usePageBuilderStore();

  const { siteStatus, setSiteStatus } = useSiteStatusStore();

  const handleSubmit = () => {
    setError("");

    if (!url) {
      setError("Please enter a URL.");
      return;
    } else if (!/\.(mp4|mov|png|jpg|jpeg)$/i.test(url)) {
      setError(
        "Supported file types are .mp4, .mov, .png, .jpg, or .jpeg files."
      );
      return;
    }

    setSiteStatus(SiteStatusType.Loading);

    if (/.mp4|.mov$/.test(url)) {
      const video = document.createElement("video");
      video.src = url;
      video.loop = true;
      video.muted = true;
      video.crossOrigin = "anonymous";
      video.play();

      const texture = new THREE.VideoTexture(video);
      texture.needsUpdate = true;

      video.onloadeddata = () => {
        const aspectRatio = video.videoWidth / video.videoHeight;
        setSiteStatus(SiteStatusType.Ready);
        addItem({
          id: Date.now(),
          position: new THREE.Vector3(0, 0, 0),
          rotation: new THREE.Vector3(0, 0, 0),
          texture,
          type: MediaType.Video,
          aspectRatio,
          filter: 0,
        });
      };
      video.onerror = (error) => {
        setSiteStatus(SiteStatusType.Ready);
        setError("Error loading media.");
        console.log(error);
      };
    } else {
      new THREE.TextureLoader().load(
        url,
        (texture) => {
          const aspectRatio = texture.image.width / texture.image.height;
          setSiteStatus(SiteStatusType.Ready);
          addItem({
            id: Date.now(),
            position: new THREE.Vector3(0, 0, 0),
            rotation: new THREE.Vector3(0, 0, 0),
            texture,
            type: MediaType.Image,
            aspectRatio,
            filter: 0,
          });
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
  };

  return (
    <div className="absolute  top-4 left-4 w-[480px] flex flex-col">
      <div className="flex">
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
          disabled={!url || siteStatus === SiteStatusType.Loading}
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
