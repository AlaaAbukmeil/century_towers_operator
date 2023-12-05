import { useState, useEffect } from "react";
import Loader from "../../common/loader";
import { status } from "../../models/status";
import { formatTimestamp, getTimeRemaining } from "../../common/date";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./App.css";

const localizer = momentLocalizer(moment);

function interpertTimestamp(
  startTime: number,
  endTime: number,
  lastScheduled: number
) {
  let nowTimestamp = new Date().getTime();
  let object = {
    command: "",
    containerColor: "",
    description: "",
    count: "",
  };
  // console.log(nowTimestamp <= (startTime))
  if (nowTimestamp >= startTime && nowTimestamp <= endTime) {
    object["command"] = "Hoisting In Operation ...";
    object["containerColor"] = "red";
    object["description"] =
      "The thoroughfare will be open to traffic at: " +
      formatTimestamp(endTime);
    object["count"] = getTimeRemaining(endTime);
  } else if (
    nowTimestamp >= startTime - 15 * 60 * 1000 &&
    nowTimestamp <= startTime
  ) {
    object["command"] = "Scheduled ...";
    object["containerColor"] = "#FFBF00";
    object[
      "description"
    ] = `A hauling operation is scheduled between: ${formatTimestamp(
      startTime
    )} - ${formatTimestamp(endTime)}`;
    object["count"] = getTimeRemaining(startTime);
  } else {
    object["command"] = "No Hoisting ...";
    object["containerColor"] = "green";
    object["description"] =
      endTime > 0
        ? "Last Scheduled Operation: " +
        
          formatTimestamp(endTime > nowTimestamp ? lastScheduled : endTime)
        : "";
  }
  return object;
}

function Preview() {
  let [command, setCommand] = useState("");
  let [count, setCount] = useState("");
  let [description, setDescription] = useState("");
  let [containerColor, setContainerColor] = useState("green");
  let [request, setRequest] = useState(false);
  let [startTime, setStartTime] = useState(0);
  let [endTime, setEndTime] = useState(0);

  let url = "https://api.powerworkplace.com/api:1K3L3Tmu/timeline/1";
  useEffect(() => {
    const req = async () => {
      setRequest(true);
      fetch(url)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          let response: status = data;
          let params = interpertTimestamp(
            response.timestamp_start,
            response.timestamp_end,
            response.timestamp_previous
          );
          setStartTime(response.timestamp_start);
          setEndTime(response.timestamp_end);
          setCommand(params.command);
          setDescription(params.description);
          setContainerColor(params.containerColor);
          setCount(params.count);
          setRequest(false);
        });
    };
    req();

    // Then fetch data every minute
    const intervalID = setInterval(req, 60 * 1000); // 60000 milliseconds = 1 minute

    // Clear interval on component unmount
    return () => {
      clearInterval(intervalID);
    };
  }, []);

  let myEventsList: any = [
    {
      start: new Date(startTime),
      end: new Date(endTime),
      title: `A hauling operation is scheduled between: ${formatTimestamp(
        startTime
      )} - ${formatTimestamp(endTime)}`,
    },
  ];

  if (request) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <div className="row">
        <div
          className="col-8 light-container"
          style={{ backgroundColor: containerColor }}
        >
          <h2>{command}...</h2>
        </div>
        <div className="col-12 description">
          <br />
          <center>
            <p>{description}</p>
            <p>{count == "" ? "" : "Count time: " + count}</p>
          </center>
        </div>
      </div>
      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          defaultDate={new Date()}
          defaultView="week"
          events={myEventsList}
          style={{ height: "100vh" }}
        />
      </div>
    </div>
  );
}

export default Preview;
