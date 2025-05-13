 

export default function Home() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-indigo-600 font-semibold mb-2">Our blog</p>
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
          Resources and insights
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          The latest industry news, interviews, technologies, and resources.
        </p>
        <div className="mt-6">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-full max-w-md"
          />
        </div>
      </div>

      <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card 1 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1559757175-5700dde67548?auto=format&fit=crop&w=800&q=80"
            alt="UX Review"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <p className="text-sm text-indigo-600 font-medium mb-1">Design</p>
            <h3 className="text-lg font-semibold text-gray-900">
              UX review presentations
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              How do you create compelling presentations that wow your
              colleagues and managers?
            </p>
            <div className="mt-4 flex items-center gap-3">
              <img
                className="w-8 h-8 rounded-full"
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Olivia"
              />
              <div className="text-sm">
                <p className="text-gray-900 font-medium">Olivia Rylee</p>
                <p className="text-gray-500">20 Jan 2022</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1581091870622-4cb7f47c6d91?auto=format&fit=crop&w=800&q=80"
            alt="Migrating to Linear"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <p className="text-sm text-indigo-600 font-medium mb-1">Product</p>
            <h3 className="text-lg font-semibold text-gray-900">
              Migrating to Linear 101
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              Learn how to streamline software projects, sprints, tasks, and bug
              tracking.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <img
                className="w-8 h-8 rounded-full"
                src="https://randomuser.me/api/portraits/men/33.jpg"
                alt="Phoenix"
              />
              <div className="text-sm">
                <p className="text-gray-900 font-medium">Phoenix Baker</p>
                <p className="text-gray-500">19 Jan 2022</p>
              </div>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80"
            alt="API Stack"
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <p className="text-sm text-indigo-600 font-medium mb-1">
              Software Engineering
            </p>
            <h3 className="text-lg font-semibold text-gray-900">
              Building your API Stack
            </h3>
            <p className="mt-2 text-gray-600 text-sm">
              The rise of RESTful APIs has been met by tools for creating,
              testing, and managing them.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <img
                className="w-8 h-8 rounded-full"
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="Lana"
              />
              <div className="text-sm">
                <p className="text-gray-900 font-medium">Lana Shaw</p>
                <p className="text-gray-500">18 Jan 2022</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
