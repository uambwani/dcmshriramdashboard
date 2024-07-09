const QueryBubble = ({ query }) => {
  return (
    <div className='flex justify-end w-full'>
      <div className='bg-emerald-200 p-4 rounded-l-lg rounded-t-lg shadow-md w-auto max-w-sm text-left'>
        <p className='text-black-900'>{query}</p>
      </div>
    </div>
  );
};

export default QueryBubble;

// Display component

// {/* Display */}
// <main className='flex-1 p-4 flex mb-4'>
// {tableLoading ? (
//   <div className='justify-center items-center m-auto'>
//     <ClipLoader color={"#36d7b7"} loading={tableLoading} size={50} />
//   </div>
// ) : (
//   analysis && (
//     <div className='relative flex flex-col items-start space-y-4 w-full'>
//       <QueryBubble query={query} />
//       <div className='bg-gray-100 p-4 rounded-lg shadow-md w-full relative'>
//         {/* <p className='text-gray-900'>{analysisData}</p> */}
//         <div className='dataframe'>
//           <p
//             className='text-gray-900'
//             dangerouslySetInnerHTML={{ __html: analysis }}
//           >
//             {/* {analysis} */}
//           </p>
//         </div>
//         <div className='absolute -bottom-4 right-2 flex space-x-2'>
//           <button
//             className='px-1 py-1 text-sm flex items-center justify-center transform hover:scale-125 transition-transform'
//             onClick={() => handleRunPython(query)}
//           >
//             <FiRefreshCw size={16} />
//           </button>
//           <button
//             className={`px-1 py-1 text-sm transform hover:scale-125 transition-transform ${
//               thumbsUpAnimation ? "animate-bounce" : ""
//             }`}
//             onClick={handleThumbsUpClick}
//           >
//             <FaThumbsUp />
//           </button>
//         </div>
//       </div>
//       <button
//         className=' px-4 py-1 text-sm bg-teal-600 text-white rounded-md ml-1 mb-2'
//         onClick={toggleTableVisibility}
//       >
//         {showTable ? (
//           <span
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "8px",
//             }}
//           >
//             Hide SQL <FaChevronUp />
//           </span>
//         ) : (
//           <span
//             style={{
//               display: "inline-flex",
//               alignItems: "center",
//               gap: "8px",
//             }}
//           >
//             View SQL <FaChevronDown />
//           </span>
//         )}
//       </button>
//       {showTable && (
//         <div className='bg-gray-100 p-4 rounded-lg shadow-md w-full relative'>
//           <pre className='text-gray-900 whitespace-pre-wrap'>
//             {sqlData}
//           </pre>
//         </div>
//       )}
//       {/* Loading Analysis */}
//       {analysisLoader ? (
//         // <div>Generating Analysis...</div>
//         <div>
//           <button
//             disabled
//             type='button'
//             class='py-2.5 px-5 me-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-blue-700 focus:text-blue-700 inline-flex items-center'
//           >
//             <svg
//               aria-hidden='true'
//               role='status'
//               class='inline w-4 h-4 me-3 text-gray-200 animate-spin dark:text-gray-600'
//               viewBox='0 0 100 101'
//               fill='none'
//               xmlns='http://www.w3.org/2000/svg'
//             >
//               <path
//                 d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
//                 fill='currentColor'
//               />
//               <path
//                 d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
//                 fill='#1C64F2'
//               />
//             </svg>
//             Generating Analysis...
//           </button>
//         </div>
//       ) : (
//         analysisData && (
//           <div className='bg-gray-100 p-4 rounded-lg shadow-md w-full relative'>
//             <h1 className='text-lg font-semibold mb-2'>Analysis</h1>
//             {analysisData}
//           </div>
//         )
//       )}
//     </div>
//   )
// )}
// {/* {analysisData && <div>{analysisData}</div>} */}
// </main>
// {/* Display */}

// Display props

// {
//   toggleTableVisibility,
//   tableLoading,
//   query,
//   analysis,
//   analysisData,
//   handleRunPython,
//   thumbsUpAnimation,
//   handleThumbsUpClick,
//   showTable,
//   analysisLoader,
//   sqlData,
// }

// Input component

// {/* Input */}
// <div className='border-5 border-red-400s'>
// <footer className='p-4 border-t border-black-300 flex flex-col items-center'>
//   {/* <Options setQuery={setQuery} focusInput={focusInput} /> */}
//   <div className='w-full flex'>
//     <input
//       type='text'
//       className='flex-grow p-2 border rounded-l'
//       placeholder='Type in a query...'
//       value={query}
//       ref={inputRef}
//       onChange={(e) => handleUserQuery(e)}
//       onKeyDown={handleKeyPress}
//     />
//     <button
//       className='p-2 bg-blue-400 text-white rounded-r'
//       // onClick={() => handleRunPython(query)}
//       onClick={() => handlePlotGeneration(query)}
//       disabled={tableLoading}
//     >
//       <svg
//         xmlns='http://www.w3.org/2000/svg'
//         className='h-6 w-6'
//         fill='none'
//         viewBox='0 0 24 24'
//         stroke='currentColor'
//       >
//         <path
//           strokeLinecap='round'
//           strokeLinejoin='round'
//           strokeWidth={2}
//           d='M14 5l7 7m0 0l-7 7m7-7H3'
//         />
//       </svg>
//     </button>
//   </div>
// </footer>
// </div>
// {/* Input */}
