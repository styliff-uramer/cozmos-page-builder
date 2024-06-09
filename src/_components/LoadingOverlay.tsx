import useSiteStatusStore, { SiteStatusType } from "../_store/siteStatusStore";

const LoadingOverlay: React.FC = () => {
  const { siteStatus } = useSiteStatusStore();

  if (siteStatus !== SiteStatusType.Loading) return null;

  return (
    <div className="fixed inset-0 bg-black/50">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-white rounded-full animate-spin border-l-blue-500"></div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
