export default function Main() {
  return (
    <main>
      Error occured
      <button
        className="border border-solid border-black"
        onClick={() => {
          window.history.back();
        }}
      >
        Go Back
      </button>
    </main>
  );
}
