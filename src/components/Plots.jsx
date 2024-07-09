import { useOutletContext } from "react-router-dom";
import Plot from "react-plotly.js";
import { ClipLoader } from "react-spinners";

const Plots = () => {
  const {
    plot,
    plotLoading,
    query,
    handlePlotGeneration,
    handleUserQuery,
    handleKeyPressPlots,
    plotAnalysis,
  } = useOutletContext();

  return (
    <div>
      {/* Input */}
      <div>
        <footer className='p-4 border-t border-black-300 flex flex-col items-center'>
          <div className='w-full flex'>
            <input
              type='text'
              className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500'
              placeholder='Type in a query...'
              value={query}
              onChange={(e) => handleUserQuery(e)}
              onKeyDown={handleKeyPressPlots}
            />
            <button
              className='p-2 bg-blue-400 text-white rounded-r'
              onClick={() => handlePlotGeneration(query)}
              disabled={plotLoading}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M14 5l7 7m0 0l-7 7m7-7H3'
                />
              </svg>
            </button>
          </div>
        </footer>
      </div>
      {/* Input */}
      <main className='flex-1 p-4 flex mb-4 items-center justify-center border-solid'>
        <div
          className='flex flex-col items-center'
          style={{
            height: "60vh",
            width: "100vw",
          }}
        >
          {plotLoading ? (
            <div className='justify-center items-center m-auto'>
              <ClipLoader color={"#36d7b7"} loading={plotLoading} size={50} />
            </div>
          ) : (
            plot && (
              <div className='relative flex flex-col items-center space-y-4 w-full'>
                <div className='flex items-center justify-center h-[60vh] w-full mt-5'>
                  <Plot
                    data={JSON.parse(plot).data}
                    layout={JSON.parse(plot).layout}
                    useResizeHandler={true}
                    style={{ width: "100%", height: "100%" }}
                    config={{ responsive: true }}
                  />
                </div>
                {plotAnalysis && (
                  <div className='p-4 rounded-lg shadow-md w-full relative mt-4'>
                    <h1 className='text-md font-semibold mb-2'>Analysis</h1>
                    {plotAnalysis}
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Plots;
