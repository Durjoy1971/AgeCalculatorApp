import { useState, useEffect } from "react";
import arrowIcon from "./assets/icon-arrow.svg";
import dayjs from "dayjs";

function App() {
  const [year, setYear] = useState("--");
  const [month, setMonth] = useState("--");
  const [day, setDay] = useState("--");

  const [dayInput, setDayInput] = useState("");
  const [monthInput, setMonthInput] = useState("");
  const [yearInput, setYearInput] = useState("");

  const [errorMessage, setErrorMessage] = useState({ 0: "", 1: "", 2: "" });

  const y_string = year > 1 ? "years" : "year";
  const m_string = month > 1 ? "months" : "month";
  const d_string = day > 1 ? "days" : "day";

  const handleDayChange = (event) => {
    const data = parseInt(event.target.value);
    setDayInput(data);
  };

  const handleMonthChange = (event) => {
    const data = parseInt(event.target.value);
    setMonthInput(data);
  };

  const handleYearChange = (event) => {
    const data = parseInt(event.target.value);
    setYearInput(data);
  };

  const check = (index, data) => {
    setErrorMessage((prev) => {
      return {
        ...prev,
        [index]: data,
      };
    });
  };

  function calling(i, limit, type) {
    let bar = Math.floor(limit / 5);

    const interval = setInterval(() => {
      i += bar;
      i = Math.floor(i);
      i = Math.min(i, limit);
      if (type === "d") setDay(i);
      if (type === "m") setMonth(i);
      if (type === "y") setYear(i);

      if (i > limit) {
        clearInterval(interval);
      }
    }, 300);
  }

  const buttonClicked = () => {
    setErrorMessage({ 0: "", 1: "", 2: "" });
    let flag = true;

    if (!dayInput || dayInput < 1) {
      check(0, "Enter a valid day");
      flag = false;
    }
    if (!monthInput || monthInput < 1 || monthInput > 12) {
      check(1, "Enter a valid month");
      flag = false;
    }
    if (!yearInput || yearInput < 1000) {
      check(2, "Enter a valid year");
      flag = false;
    }
    if (monthInput === 2 && yearInput % 4 === 0 && yearInput % 100 !== 0) {
      if (dayInput > 29) {
        check(0, "Enter a valid day");
        flag = false;
      }
    } else if (monthInput === 2 && yearInput % 4 !== 0) {
      if (dayInput > 28) {
        check(0, "Enter a valid day");
        flag = false;
      }
    } else if (
      monthInput === 4 ||
      monthInput === 6 ||
      monthInput === 9 ||
      monthInput === 11
    ) {
      if (dayInput > 30) {
        check(0, "Enter a valid day");
        flag = false;
      }
    } else if (dayInput > 31) {
      check(0, "Enter a valid day");
      flag = false;
    }
    if (flag) {
      const cur_date = dayjs();
      const input_day = dayjs(`${yearInput}-${monthInput}-${dayInput}`);
      let diffDays = cur_date.diff(input_day, "day");
      let diffMonths = cur_date.diff(input_day, "month");
      let diffYears = cur_date.diff(input_day, "year");

      calling(0, diffDays, "d");
      calling(0, diffMonths, "m");
      calling(0, diffYears, "y");
    } else {
      setYear("- -");
      setMonth("- -");
      setDay("- -");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen font-display">
      <div className=" bg-white px-5 pt-7 pb-2 border rounded-lg rounded-br-[80px] shadow-zinc-500 shadow-md md:px-14">
        <div className="mt-2 flex gap-3 md:gap-7">
          <div className="flex flex-col gap-2 ">
            <label
              className="font-bold text-[10px] text-gray-400 tracking-[2px] md:text-[12px] md:tracking-[3px]"
              htmlFor="day"
            >
              DAY
            </label>
            <input
              id="day"
              type="number"
              className={`border border-gray-300 w-[85px] md:w-[110px] rounded-md pl-2 py-1 font-bold hover:border-purple-600 hover:border-2 ${
                errorMessage[1].length === 0 ? "text-orange-400" : "bg-red-100"
              }`}
              placeholder="DD"
              value={dayInput}
              onChange={handleDayChange}
            />
            {errorMessage[0] !== "" && (
              <span className="text-red-500 font-bold text-[10px] md:text-[13px]">
                {errorMessage[0]}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="font-bold text-[10px] text-gray-400 tracking-[2px] md:text-[12px] md:tracking-[3px]"
              htmlFor="month"
            >
              MONTH
            </label>

            <input
              type="number"
              id="month"
              className={`border border-gray-300 w-[95px] md:w-[110px] rounded-md pl-2 py-1 font-bold hover:border-purple-600 hover:border-2 ${
                errorMessage[1].length === 0 ? "text-orange-400" : "bg-red-100"
              }`}
              placeholder="MM"
              value={monthInput}
              onChange={handleMonthChange}
            />
            {errorMessage[1] !== "" && (
              <span className="text-red-500 font-bold text-[10px] md:text-[13px]">
                {errorMessage[1]}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              className="font-bold text-[10px] text-gray-400 tracking-[2px] md:text-[12px] md:tracking-[3px]"
              htmlFor="year"
            >
              YEAR
            </label>
            <input
              id="year"
              type="number"
              className={`border border-gray-300 w-[85px] md:w-[110px] rounded-md pl-2 py-1 font-bold hover:border-purple-600 hover:border-2 ${
                errorMessage[2].length === 0 ? "text-orange-400" : "bg-red-100"
              }`}
              placeholder="YYYY"
              value={yearInput}
              onChange={handleYearChange}
            />
            {errorMessage[2] !== "" && (
              <span className="text-red-500 font-bold text-[10px] md:text-[13px]">
                {errorMessage[2]}
              </span>
            )}
          </div>
        </div>

        <div className="my-14 relative">
          <hr className="bg-gray-400 pt-[1px]" />
          <img
            className=" p-4 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hover:bg-indigo-600 bg-green-500 md:left-[92%]"
            src={arrowIcon}
            alt="Arrow Icon"
            onClick={buttonClicked}
          />
        </div>

        <div className="mb-2">
          <h1 className="font-[900] text-4xl">
            <span className="text-purple-700 text-5xl">{year}</span> {y_string}
          </h1>
          <h1 className="font-[900] text-4xl">
            <span className="text-purple-700 text-5xl">{month}</span> {m_string}
          </h1>
          <h1 className="font-[900] text-4xl">
            <span className="text-purple-700 text-5xl">{day}</span> {d_string}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default App;
