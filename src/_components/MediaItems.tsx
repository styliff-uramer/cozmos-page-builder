import usePageBuilderStore from "../_store/pageBuilderStore";
import MediaItem from "./MediaItem";

type Props = {};

const MediaItems = (props: Props) => {
  const { items } = usePageBuilderStore();

  return items.map((item) => {
    return <MediaItem key={item.id} item={item} />;
  });
};

export default MediaItems;
