// // src/components/admin/DashboardOverview.tsx
// const DashboardOverview = () => {
//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md mb-8">
//       <h2 className="text-2xl font-bold mb-4">Overview</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         <div className="p-6 bg-gray-100 rounded-lg shadow-sm flex flex-col items-center">
//           <p className="text-gray-500">Total Posts</p>
//           <h3 className="text-2xl font-bold">10</h3>
//         </div>
//         <div className="p-6 bg-gray-100 rounded-lg shadow-sm flex flex-col items-center">
//           <p className="text-gray-700">Total Views</p>
//           <h3 className="text-2xl font-bold">1,234</h3>
//         </div>
//         {/* Add more stats as needed */}
//       </div>
//     </div>
//   );
// };

// export default DashboardOverview;
// src/components/admin/DashboardOverview.tsx
const DashboardOverview = ({ totalPosts, totalViews }: { totalPosts: number; totalViews: number }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 bg-gray-200 rounded-lg shadow-sm flex flex-col items-center">
          <p className="text-gray-700">Total Posts</p>
          <h3 className="text-2xl font-bold text-gray-900">{totalPosts}</h3>
        </div>
        <div className="p-6 bg-gray-200 rounded-lg shadow-sm flex flex-col items-center">
          <p className="text-gray-700">Total Views</p>
          <h3 className="text-2xl font-bold text-gray-900">{totalViews}</h3>
        </div>
        {/* Add more stats as needed */}
      </div>
    </div>
  );
};

export default DashboardOverview;