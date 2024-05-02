import { Skeleton } from "antd";

const LoadingCard: React.FC = () => {
  return (
    <div className="border rounded p-2">
      <Skeleton.Image active className="mb-2" />
      <Skeleton active />
    </div>
  );
};

export default LoadingCard;
