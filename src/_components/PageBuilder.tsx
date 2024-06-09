import LoadingOverlay from "./LoadingOverlay";
import Scene from "./Scene";
import TextureButtons from "./TextureButtons";
import UrlInput from "./UrlInput";

type Props = {};

const PageBuilder = (props: Props) => {
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
