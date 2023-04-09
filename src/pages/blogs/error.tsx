export default function Main() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-24">
      <div className="mx-auto grid w-full grid-cols-1 items-center gap-10 md:w-4/5 lg:grid-cols-2 xl:gap-32">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
            {"Error 404"}
          </p>
          <h1 className="mb-4 text-left text-2xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-4xl">
            {"Oops! The page you're looking for isn't here."}
          </h1>
          <p className="mb-5 text-left text-base text-gray-800 md:text-xl">
            {"  You might have the wrong address, or the page may have moved."}
          </p>
          <a
            href="#"
            className="btn btn-lg btn-light mb-2 mr-2 w-full rounded bg-purple-300 px-2 py-1 sm:mb-0 sm:w-auto"
            onClick={() => {
              window.history.back();
            }}
          >
            {" Back to homepage"}
          </a>
          <a
            href="#"
            className="btn btn-lg btn-white mb-2 ml-2 w-full rounded bg-purple-100 px-2 py-1 sm:mb-0 sm:w-auto"
          >
            {"Contact us"}
          </a>
        </div>
        <div>
          <Image
            className="h-full w-full rounded-lg bg-gray-100"
            src="https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
          />
        </div>
      </div>
    </section>
  );
}
