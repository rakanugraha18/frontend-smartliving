const SkeletonLoader = () => {
  return (
    <div className="animate-pulse w-1/2 sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 px-5">
      <div className="bg-gray-300 h-40 w-full mb-4"></div>
      <div className="h-4 bg-gray-300 mb-2"></div>
      <div className="h-4 bg-gray-300 mb-2"></div>
      <div className="h-4 bg-gray-300 mb-2 sm:hidden"></div>
    </div>
  );
};

export default SkeletonLoader;
