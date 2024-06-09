import LoadingOverlay from "./LoadingOverlay";
import Scene from "./Scene";
import TextureButtons from "./TextureButtons";
import UrlInput from "./UrlInput";

const PageBuilder = () => {
  return (
    <>
      <UrlInput />
      <Scene />
      <LoadingOverlay />
      <TextureButtons />
    </>
  );
};

export default PageBuilder;
