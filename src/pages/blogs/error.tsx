export default function Main() {
    return (
        <section className="px-4 py-24 mx-auto max-w-7xl">
            <div className="grid items-center w-full grid-cols-1 gap-10 mx-auto md:w-4/5 lg:grid-cols-2 xl:gap-32">
                <div>
                    <p className="mb-2 text-xs font-semibold tracking-wide text-gray-500 uppercase">
                        {"Error 404"}
                    </p>
                    <h1 className="mb-4 text-2xl font-extrabold leading-tight tracking-tight text-left text-gray-900 md:text-4xl">
                        {"Oops! The page you're looking for isn't here."}
                    </h1>
                    <p className="mb-5 text-base text-left text-gray-800 md:text-xl">
                        {"  You might have the wrong address, or the page may have moved."}
                    </p>
                    <a
                        href="#"
                        className="w-full mb-2 btn btn-lg btn-light sm:w-auto sm:mb-0 bg-purple-300 rounded px-2 mr-2 py-1"
                        onClick={() => {
                            window.history.back();
                        }}
                    >
                        {" Back to homepage"}
                    </a>
                    <a
                        href="#"
                        className="w-full mb-2 btn btn-lg btn-white sm:w-auto sm:mb-0 bg-purple-100 rounded px-2 ml-2 py-1"
                    >
                        {"Contact us"}
                    </a>
                </div>
                <div>
                    <img className="w-full h-full bg-gray-100 rounded-lg" src="https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80" />
                </div>
            </div>
        </section>
    );
}
