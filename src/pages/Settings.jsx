
function Settings() {

  return (

    <div className="max-w-xl mx-auto p-10">

      <h1 className="text-3xl font-bold mb-8">
        Account Settings
      </h1>

      <div className="space-y-4">

        <input
          placeholder="Name"
          className="w-full border p-3 rounded"
        />

        <input
          placeholder="Email"
          className="w-full border p-3 rounded"
        />

        <textarea
          placeholder="Bio"
          className="w-full border p-3 rounded"
        />

        <button className="bg-black text-white px-6 py-2 rounded">
          Save Changes
        </button>

      </div>

    </div>

  )
}

export default Settings

