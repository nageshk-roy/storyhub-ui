
function Dashboard() {

  return (

    <div className="max-w-screen-xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-10">
        Creator Dashboard
      </h1>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6 mb-12">

        <div className="bg-white shadow p-6 rounded-xl">
          <p className="text-gray-500 text-sm">Total Views</p>
          <h2 className="text-2xl font-bold">12,450</h2>
        </div>

        <div className="bg-white shadow p-6 rounded-xl">
          <p className="text-gray-500 text-sm">Followers</p>
          <h2 className="text-2xl font-bold">1,245</h2>
        </div>

        <div className="bg-white shadow p-6 rounded-xl">
          <p className="text-gray-500 text-sm">Articles</p>
          <h2 className="text-2xl font-bold">32</h2>
        </div>

        <div className="bg-white shadow p-6 rounded-xl">
          <p className="text-gray-500 text-sm">Earnings</p>
          <h2 className="text-2xl font-bold">₹18,200</h2>
        </div>

      </div>

    </div>
  )
}

export default Dashboard

