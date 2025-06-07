function Answer() {
  return (
    <div className="h-dvh">
      <div className="h-full grid grid-cols-1 sm:grid-cols-2">
        <div className="bg-white flex items-center justify-center">
          <h2 className="text-xl">Left</h2>
        </div>
        <div className="bg-black flex items-center justify-center">
          <h1 className="text-white">Right</h1>
        </div>
      </div>
    </div>
  );
}

export default Answer;
