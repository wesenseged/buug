export const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-zinc-100 dark:bg-zinc-900 text-gray-700 dark:text-gray-300">
      <h1 className="text-2xl font-bold mb-2">Oops!</h1>
      <p className="text-center mb-4">
        Something went wrong. Please check your network connection or try again
        later.
      </p>
    </div>
  );
};
