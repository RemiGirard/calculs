export default function ({ setRootPage }:{
    setRootPage: () => void
}) {
  return (
    <>
      <h1>Page not found</h1>
      <button onClick={setRootPage}>Back to home</button>
    </>
  );
}
