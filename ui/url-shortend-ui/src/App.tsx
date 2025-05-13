import "./App.css";
import TabContainer from "./components/tabs/TabContainer";

function App() {
  return (
    <>
      <main className="flex flex-col min-h-dvh items-center justify-center bg-gray-50 p-4 max-w-md mx-auto">
        <header className="flex flex-col text-center p-6 space-y-1.5">
          <span className="flex justify-center items-center mx-auto bg-gray-200 size-10 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-link h-6 w-6 text-primary"
            >
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
            </svg>
          </span>
          <h1 className="font-semibold text-2xl">URL Shortener</h1>
          <p className="text-sm text-muted-foreground">Create, look up, and track shortened URLs</p>
        </header>
       <div className="w-95 space-y-4">
        <TabContainer />
       </div>
      </main>
    </>
  );
}

export default App;
