import Scene from "./Scene";
import UrlInput from "./UrlInput";

type Props = {};

const PageBuilder = (props: Props) => {
  return (
    <>
      <UrlInput />
      <Scene />
    </>
  );
};

export default PageBuilder;
