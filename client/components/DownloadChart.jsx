import { useRef, useState } from "react";
import { FiDownload } from "react-icons/fi";

const DownloadChart = ({
    title,
    filename,
    Chart,
    labelvals,
    datavals,
    datalabels,
    setStart,
    setRange,
    queryLoading,
    startDate,
    range,
}) => {
    const chartRef = useRef(null);
    const downloadLinkRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const downloadGraph = () => {
        //setLoading(true);
        if (chartRef.current) {
            downloadLinkRef.current.href = chartRef.current.toBase64Image();
        }
        //setLoading(false);
    };

    return (
        <div className="card w-full bg-base-300 p-3 lg:p-4">
            {title && <h2 className="card-title text-base-content">{title}</h2>}
            <div className="h-full w-full">
                <Chart
                    chartRef={chartRef}
                    labelvals={labelvals}
                    datavals={datavals}
                    datalabels={datalabels}
                />
            </div>
            <div className="card-actions mt-1 items-center overflow-visible">
                {filename && (
                    <a
                        ref={downloadLinkRef}
                        onClick={downloadGraph}
                        download={filename}
                        data-testid="download"
                        className={`btn btn-primary ${loading && "loading"}`}
                    >
                        <FiDownload className="text-xl text-primary-content" />
                    </a>
                )}

                <div>
                    {setStart && (
                        <input
                            type="date"
                            name="visitDate"
                            placeholder="Visit Date"
                            className="input input-bordered w-full text-base-content"
                            onChange={(e) => {
                                const date = new Date(e.target.value);

                                if (!isNaN(date)) {
                                    setStart(date);
                                }
                            }}
                        />
                    )}
                </div>
                {setRange && (
                    <select
                        data-testid="range-select"
                        onChange={(e) => {
                            const range = e.target.value;
                            setRange(range === "30-day" ? 30 : 7);
                        }}
                        className="select select-primary w-full max-w-xs"
                    >
                        <option>7-day</option>
                        <option>30-day</option>
                    </select>
                )}
                {queryLoading && 
                    <progress className="progress progress-primary">
                        Showing
                    </progress>
                }
            </div>
        </div>
    );
};

export default DownloadChart;
