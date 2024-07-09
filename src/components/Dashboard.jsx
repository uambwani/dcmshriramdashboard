import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { FaCheck } from "react-icons/fa";
import Plot from "react-plotly.js";

const Dashboard = () => {
  const {
    dashLoading,
    optionLoading,
    query,
    handleOptionGeneration,
    handleUserQuery,
    dashboardOptions,
    handleOptionSelect,
    handleGeneratePlots,
    selectedOptions,
    dashboard,
    isAccordionOpen,
    toggleAccordion,
    handleKeyPressDash,
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
              onKeyDown={handleKeyPressDash}
            />
            <button
              className='p-2 bg-blue-400 text-white rounded-r'
              onClick={() => handleOptionGeneration(query)}
              disabled={optionLoading}
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
      <main className='flex-1 p-4 flex flex-col mb-4 items-center justify-center border-solid'>
        <div className='flex flex-col items-center w-full'>
          {optionLoading ? (
            <div className='justify-center items-center m-auto'>
              <ClipLoader color={"#36d7b7"} loading={optionLoading} size={50} />
            </div>
          ) : (
            dashboardOptions && (
              <div
                id='accordion-flush'
                className='w-full'
                data-accordion='collapse'
                data-active-classes='bg-white text-gray-900 '
                data-inactive-classes='text-gray-500 dark:text-gray-400'
              >
                <h2 id='accordion-flush-heading-1'>
                  <button
                    type='button'
                    className='flex items-center justify-between w-full py-5 font-medium text-gray-900 border-b border-gray-200 '
                    data-accordion-target='#accordion-flush-body-1'
                    aria-expanded={isAccordionOpen}
                    aria-controls='accordion-flush-body-1'
                    onClick={toggleAccordion}
                  >
                    <span>Generated Options</span>
                    <svg
                      data-accordion-icon
                      className={`w-6 h-6 transition-transform ${
                        isAccordionOpen ? "rotate-180" : ""
                      }`}
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 9l-7 7-7-7'
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id='accordion-flush-body-1'
                  className={`${isAccordionOpen ? "" : "hidden"}`}
                  aria-labelledby='accordion-flush-heading-1'
                >
                  <div className='py-5 border-b border-gray-200 dark:border-gray-700'>
                    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                      {dashboardOptions.map((option, index) => (
                        <li
                          className={`relative p-4 border rounded-lg shadow cursor-pointer hover:bg-blue-50 transition ${
                            selectedOptions.includes(index)
                              ? "bg-blue-100 border-blue-400"
                              : "bg-white"
                          }`}
                          key={index}
                          onClick={() => handleOptionSelect(index)}
                        >
                          <span className='text-gray-700 space-y-2'>
                            <>
                              <p className='text-lg font-semibold text-blue-600'>
                                {option.chartType}
                              </p>
                              {option.xaxis && (
                                <p className='text-sm text-gray-500'>
                                  X-axis:{" "}
                                  <span className='font-medium text-gray-800'>
                                    {option.xaxis}
                                  </span>
                                </p>
                              )}
                              {option.yaxis && (
                                <p className='text-sm text-gray-500'>
                                  Y-axis:{" "}
                                  <span className='font-medium text-gray-800'>
                                    {option.yaxis}
                                  </span>
                                </p>
                              )}
                              {option.value && (
                                <p className='text-sm text-gray-500'>
                                  Value:{" "}
                                  <span className='font-medium text-gray-800'>
                                    {option.value}
                                  </span>
                                </p>
                              )}
                            </>
                          </span>
                          {selectedOptions.includes(index) && (
                            <FaCheck className='absolute bottom-2 right-2 h-4 w-4 text-green-600' />
                          )}
                        </li>
                      ))}
                    </ul>
                    <div className='flex justify-end mt-4'>
                      <button
                        className='p-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300'
                        onClick={handleGeneratePlots}
                        disabled={selectedOptions.length === 0}
                      >
                        Generate Plots
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        {/* <div className='w-full'>
          {dashLoading ? (
            <div className='flex justify-center items-center h-[60vh]'>
              <ClipLoader color={"#36d7b7"} loading={dashLoading} size={50} />
            </div>
          ) : (
            dashboard && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-5 w-full'>
                {dashboard.map((dash, index) =>
                  dash && dash.plot_json ? (
                    <div
                      key={index}
                      className='w-full h-[60vh] p-4 border rounded-lg shadow-md bg-white border-black'
                    >
                      <Plot
                        data={JSON.parse(dash.plot_json).data}
                        layout={JSON.parse(dash.plot_json).layout}
                        useResizeHandler={true}
                        style={{ width: "100%", height: "100%" }}
                        config={{ responsive: true }}
                      />
                    </div>
                  ) : null
                )}
              </div>
            )
          )}
        </div> */}
        <div className='w-full'>
          {dashLoading ? (
            <div className='flex justify-center items-center h-[60vh]'>
              <ClipLoader color={"#36d7b7"} loading={dashLoading} size={50} />
            </div>
          ) : (
            dashboard && (
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-5 w-full'>
                {dashboard.map((dash, index) =>
                  dash && dash.plot_json ? (
                    <div
                      key={index}
                      className='w-full h-[60vh] p-6 border rounded-lg shadow-lg bg-white border-gray-300 overflow-hidden'
                    >
                      {/* <p className='text-sm text-gray-500 mb-4'>
                        Plot description providing more details.
                      </p> */}
                      <div className='w-full h-full'>
                        <Plot
                          data={JSON.parse(dash.plot_json).data}
                          layout={JSON.parse(dash.plot_json).layout}
                          useResizeHandler={true}
                          style={{ width: "100%", height: "100%" }}
                          config={{ responsive: true }}
                        />
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
