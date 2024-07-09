import { useState, useRef } from "react";
import { Nav } from "./components";
import { toast } from "react-toastify";
import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  const [analysis, setAnalysis] = useState("");
  const [sqlData, setSqlData] = useState("");
  const [analysisData, setAnalysisData] = useState("");
  const [tableLoading, setTableLoading] = useState(false);
  const [analysisLoader, setAnalysisLoader] = useState(false);
  const [query, setQuery] = useState("");
  const [thumbsUpAnimation, setThumbsUpAnimation] = useState(false);
  const [copyTable, setCopyTable] = useState("");

  // plots
  const [plot, setPlot] = useState("");
  const [plotLoading, setPlotLoading] = useState(false);
  const [plotAnalysis, setPlotAnalysis] = useState("");

  // dashboard
  const [dashboardOptions, setDashboardOptions] = useState(null);
  const [sqlQueries, setSqlQueries] = useState([]);
  const [plotResponses, setPlotResponses] = useState([]);
  const [dashResponse, setDashResponse] = useState(null);
  const [dashPlot, setDashPlot] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dashboard, setDashboard] = useState([]);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [dashLoading, setDashLoading] = useState(false);
  const [optionLoading, setOptionLoading] = useState(false);

  // show table and split data
  const [showTable, setShowTable] = useState(false);

  const toggleTableVisibility = () => {
    setShowTable((prevShowTable) => !prevShowTable);
  };

  const inputRef = useRef(null);

  //focus input field using ref
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // animation
  const handleThumbsUpClick = () => {
    setThumbsUpAnimation(true);
    console.log("Response added to cache");
    setTimeout(() => {
      setThumbsUpAnimation(false);
    }, 1000);
  };

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  const handleUserQuery = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const handleKeyPressDisplay = (e) => {
    if (e.key === "Enter") {
      handleRunPython(query);
    }
  };

  const handleKeyPressPlots = (e) => {
    if (e.key === "Enter") {
      handlePlotGeneration(query);
    }
  };

  const handleKeyPressDash = (e) => {
    if (e.key === "Enter") {
      handleOptionGeneration(query);
    }
  };

  const handleOptionSelect = (index) => {
    setSelectedOptions((prev) => {
      if (prev.includes(index)) {
        // Deselect the option if it's already selected
        return prev.filter((i) => i !== index);
      } else {
        // Select the option if it's not already selected
        return [...prev, index];
      }
    });
  };

  const handleGeneratePlots = async () => {
    setDashLoading(true);

    const inProgressToastId = toast.info("Generating Dashboard...", {
      autoClose: false,
    });

    setIsAccordionOpen(false);

    const selectedSqlQueries = selectedOptions.map(
      (index) => sqlQueries[index]
    );
    const selectedPlotResponses = selectedOptions.map(
      (index) => plotResponses[index]
    );

    console.log("selectedSqlQueries", selectedSqlQueries);
    console.log("selectedPlotResponses", selectedPlotResponses);

    const allResponses = await Promise.all(
      selectedSqlQueries.map((sqlQuery, index) =>
        handleDashboardGeneration(sqlQuery, selectedPlotResponses[index])
      )
    );

    toast.dismiss(inProgressToastId);
    toast.success("Dashboard Generated!");

    setDashboard(allResponses.filter((response) => response !== null));
    setDashLoading(false);

    // console.log("Final Dashboard Output:", dashboard);
  };

  // analysis
  const handleRunPython = async (query) => {
    setTableLoading(true);
    // Show "In Progress" toast
    const inProgressToastId = toast.info("Generating Analysis...", {
      autoClose: false,
    });

    setAnalysis("");
    setSqlData("");
    setAnalysisData("");
    setCopyTable("");

    console.log(query);

    try {
      const response = await fetch(
        "https://dcm-backend-analysis-jthp5ztqva-uc.a.run.app/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );
      const data = await response.json();
      console.log("Data from Python file:", data);
      console.log("data sql", data.sql_query);

      if (response.ok) {
        setAnalysis(data.result);
        setSqlData(data.sql_query);
        console.log("analysis", analysis);
        console.log("type of response", typeof data.result);

        setCopyTable(data.markdown_table);

        toast.dismiss(inProgressToastId);
        toast.success("Table Generated!");

        setTableLoading(false);

        setAnalysisLoader(true);

        // Second fetch call to the /analyze route
        const analyzeResponse = await fetch(
          "https://dcm-backend-analysis-jthp5ztqva-uc.a.run.app/analyze",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_query: data.user_query,
              markdown_table: data.markdown_table,
            }),
          }
        );

        const analyzeData = await analyzeResponse.json();
        setAnalysisData(analyzeData.analysis);
        setAnalysisLoader(false);
        console.log("Analysis data from Python file:", analyzeData);
      } else {
        console.error("Error from backend:", data.error);
        toast.error("Error analyzing file. Please try again.");
      }

      setTableLoading(false);
    } catch (error) {
      console.error("Error running Python file:", error);

      setTableLoading(false);
      toast.dismiss(inProgressToastId);
      // Show "Error" toast
      toast.error("Error analyzing file. Please try again.");
    }
  };

  const parseData = (data) => {
    return data.map((item) => {
      // Extract the chart type
      const chartTypeMatch = item.match(/\$(.*?)\$/);
      const chartType = chartTypeMatch ? chartTypeMatch[1] : "";

      // Extract the JSON part
      const jsonStringMatch = item.match(/\@(.*?)\@/);
      const jsonString = jsonStringMatch ? jsonStringMatch[1] : "";

      // Fix JSON string formatting
      const fixedJsonString = jsonString
        .replace(/'/g, '"') // Replace single quotes with double quotes
        .replace(/,\s*}/g, "}") // Remove trailing commas before closing braces
        .replace(/,\s*]/g, "]"); // Remove trailing commas before closing brackets

      // Parse the JSON string
      let chartDetails;
      try {
        chartDetails = JSON.parse(fixedJsonString);
      } catch (error) {
        console.error("JSON parsing error:", error);
        return {
          chartType,
          xaxis: null,
          yaxis: null,
          value: null,
        };
      }

      // Extract x and y axis or value
      const xaxis = chartDetails.xaxis || null;
      const yaxis = chartDetails.yaxis || null;
      const value = chartDetails.value || null;

      return {
        chartType,
        xaxis,
        yaxis,
        value,
      };
    });
  };

  // dashboard
  const handleOptionGeneration = async (query) => {
    setOptionLoading(true);
    // Show "In Progress" toast
    const inProgressToastId = toast.info("Generating Options...", {
      autoClose: false,
    });

    console.log(query);

    setDashboard(null);
    setDashboardOptions(null);
    setIsAccordionOpen(true);
    setSelectedOptions([]);

    try {
      const response = await fetch(
        "https://dcm-backend-dashboard-jthp5ztqva-uc.a.run.app/plotselection",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_query: query }),
        }
      );

      const dashboardData = await response.json();
      console.log("Dashboard data", dashboardData);

      if (response.ok) {
        const trimmedPlotResponses = dashboardData.plot_responses.map(
          (response) => {
            const startIndex = response.indexOf("$") + 1;
            const endIndex = response.indexOf("$", startIndex);
            return startIndex !== -1 && endIndex !== -1
              ? response.substring(startIndex, endIndex)
              : response;
          }
        );

        const plotOptions = parseData(dashboardData.plot_responses);
        console.log("new options", plotOptions);

        setDashboardOptions(plotOptions);
        // setDashboardOptions(trimmedPlotResponses);
        // setDashboardOptions(dashboardData.generated_queries);
        setSqlQueries(dashboardData.sql_queries);
        setPlotResponses(dashboardData.plot_responses);

        console.log("Dashboard options", plotOptions);

        setOptionLoading(false);
        toast.dismiss(inProgressToastId);
        toast.success("Options Generated!");
      } else {
        console.error("Error from backend:", plotData.error);
        setOptionLoading(false);
        toast.error("Error analyzing file. Please try again.");
      }
    } catch (error) {
      console.error("Error running Python file:", error);

      setOptionLoading(false);
      toast.dismiss(inProgressToastId);
      toast.error("Error analyzing file. Please try again.");
    }
  };

  const handleDashboardGeneration = async (sqlQuery, plotResponse) => {
    setPlotLoading(true);
    setDashResponse(null);

    try {
      const response = await fetch("http://127.0.0.1:7070/plotgeneration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sql_response: sqlQuery,
          plot_response: plotResponse,
        }),
      });

      const text = await response.text();
      const dashRes = text ? JSON.parse(text) : null;
      console.log("result from dashboard", dashRes);

      if (
        response.ok &&
        dashRes &&
        dashRes.plot_result_html &&
        dashRes.plot_json
      ) {
        console.log("response ok");
        setPlotLoading(false);

        return dashRes;
      } else {
        console.error("Error from backend:", dashRes.error);
        setPlotLoading(false);
      }
    } catch (error) {
      console.error("Error running Python file:", error);
      setPlotLoading(false);
    }
  };

  // plots
  const handlePlotGeneration = async (query) => {
    setPlotLoading(true);
    // Show "In Progress" toast
    const inProgressToastId = toast.info("Generating Plots...", {
      autoClose: false,
    });

    console.log(query);

    setPlot("");
    setPlotAnalysis("");

    try {
      const response = await fetch(
        "https://dcm-backend-graph-jthp5ztqva-uc.a.run.app/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );

      const plotData = await response.json();
      console.log("Plot data", plotData);

      if (response.ok) {
        setPlotAnalysis(plotData.analysis);
        setPlot(plotData.plot_json);
        // console.log("Setting plot:", plotHtml);

        setPlotLoading(false);
        toast.dismiss(inProgressToastId);
        toast.success("Plot Generated!");
      } else {
        console.error("Error from backend:", plotData.error);
        setPlotLoading(false);
        toast.error("Error analyzing file. Please try again.");
      }
    } catch (error) {
      console.error("Error running Python file:", error);

      setPlotLoading(false);
      toast.dismiss(inProgressToastId);
      // Show "Error" toast
      toast.error("Error analyzing file. Please try again.");
    }
  };

  const contextValue = {
    tableLoading,
    plotLoading,
    toggleTableVisibility,
    query,
    analysis,
    analysisData,
    copyTable,
    handleRunPython,
    thumbsUpAnimation,
    handleThumbsUpClick,
    showTable,
    analysisLoader,
    sqlData,
    handlePlotGeneration,
    handleUserQuery,
    handleKeyPressDisplay,
    handleKeyPressPlots,
    plot,
    plotAnalysis,
    setQuery,
    focusInput,
    handleOptionGeneration,
    dashboardOptions,
    handleOptionSelect,
    dashPlot,
    handleGeneratePlots,
    selectedOptions,
    dashboard,
    toggleAccordion,
    isAccordionOpen,
    handleKeyPressDash,
    optionLoading,
    dashLoading,
  };

  return (
    <div className='flex flex-col min-h-screen mx-auto font-noto bg-gray-100'>
      <Nav />
      <Outlet context={contextValue} />
    </div>
  );
}

export default App;
