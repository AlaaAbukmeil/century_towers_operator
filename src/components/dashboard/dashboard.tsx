import NavBar from "../../common/navbar";
import {
  getRequestOptions,
  handleAuth,
  postRequestOptions,
} from "../../common/cookie";
import { useEffect, useState } from "react";
import Preview from "./showPreview";
import axios from "axios";
import Loader from "../../common/loader";
import { formatTimestamp } from "../../common/date";

async function getPreviousSchedule() {
  let url = "https://api.powerworkplace.com/api:1K3L3Tmu/timeline/1";
  let action = await axios.get(url);
  return action.data;
}

function Dashboard() {
  let url = "https://api.powerworkplace.com/api:jPikx0Y1/validate_token";
  let [request, setRequest] = useState(false);

  useEffect(() => {
    fetch(url, getRequestOptions).then((res) => {
      handleAuth(res.status);
      return res.json();
    });
  }, []);

  let [start, setStart] = useState(0);
  let [end, setEnd] = useState(0);
  let urlParams = "https://api.powerworkplace.com/api:1K3L3Tmu/timeline/1";
  useEffect(() => {
    fetch(urlParams, getRequestOptions)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res)
        setStart(res.timestamp_start);
        setEnd(res.timestamp_end);
      });
  }, []);
  const handleChange = (event: any) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const [formState, setFormState] = useState({
    timestamp_start: "",
    timestamp_end: "",
  });

  async function handleSubmit(event: any) {
    event.preventDefault();
    let url = "https://api.powerworkplace.com/api:1K3L3Tmu/timeline/1";
    let start = new Date(formState.timestamp_start).getTime();
    let end = new Date(formState.timestamp_end).getTime();
    let now = new Date().getTime();
    if (end < start) {
      alert("end time should be after start time");
      return;
    } else if (start < now) {
      alert("start time should in the future");
    } else {
      let previous = await getPreviousSchedule();
      let object = {
        timestamp_start: start,
        timestamp_end: end,
        timestamp_previous: previous.timestamp_end,
      };

      try {
        setRequest(true);
        let action = await axios.post(url, object, postRequestOptions);
        if (action.status == 200) {
          window.alert("successful update");
        }
        setRequest(false);
      } catch (error) {
        setRequest(false);
      }
    }
  }

  async function endNow(event: any) {
    let confirm: any = window.confirm(
      "confirm if you want to end the scheduled/current operation"
    );
    if (confirm) {
      event.preventDefault();
      let url = "https://api.powerworkplace.com/api:1K3L3Tmu/timeline/1";
      let object = {
        timestamp_start: 0,
        timestamp_end: 0,
        timestamp_previous: 0,
      };

      try {
        setRequest(true);
        let action = await axios.post(url, object, postRequestOptions);
        if (action.status == 200) {
          window.alert("successful update");
          setStart(0)
          setEnd(0)
        }
        setRequest(false);
      } catch (error) {
        setRequest(false);
      }
    }
  }

  if (request) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <div className="title">
        <h1>Century Towers Customer Preview</h1>
        <Preview />
      </div>
      <div className="row">
        <form
          className="card-form"
          id="timeline"
          onSubmit={(event) => handleSubmit(event)}
        >
          <h2>Next Suspension Scheduled (start time)</h2>
          <h4>{start > 0 ?`start time scheduled: ${formatTimestamp(start)}` : ""}</h4>
          <input
            id="start"
            title="next"
            type="datetime-local"
            className="formTextInput inputCustom"
            name="timestamp_start"
            value={formState.timestamp_start}
            onChange={handleChange}
            required
          />
          <h2 className="input-custom">Next Suspension Scheduled (end time)</h2>

          <h4>{end > 0 ? `end time scheduled: ${formatTimestamp(end)}` : ""}</h4>
          <input
            id="end"
            title="next"
            type="datetime-local"
            className="formTextInput inputCustom"
            name="timestamp_end"
            value={formState.timestamp_end}
            onChange={handleChange}
            required
          />
          <div className="btn-container">
            <button
              type="button"
              onClick={(event) => endNow(event)}
              className="btn upload-btn end-btn"
            >
              End Now
            </button>
            <button type="submit" className="btn upload-btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;
