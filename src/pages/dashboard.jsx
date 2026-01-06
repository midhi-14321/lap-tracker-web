import { useState, useEffect } from "react";
import api from "../utils/axiosInstance";
import React from "react";
import StatusCard from "./statusCard";
import ActionButton from "./actionButton";

const Dashboard = () => {
  const [session, setSession] = useState(null);
  const [lap, setLap] = useState(null);
  const [loading, setLoading] = useState(false); // prevents double submit
  const [error, setError] = useState(null);
  const [restoring, setRestoring] = useState(true);

  useEffect(() => {
    const restoreSessionAndLap = async () => {
      try {
        const { data } = await api.get("/session/active");

        // restore session
        if (data.session?.id) {
          setSession({
            sessionId: data.session.id,
            startTime: data.session.startTime,
          });
        }

        // restore lap (ONLY if exists)
        if (data.lap?.lapId) {
          setLap({
            lapId: data.lap.lapId,
            startTime: data.lap.lapStart,
          });
        }
      } catch (err) {
        console.log("No active session or lap");
      } finally {
        setRestoring(false);
      }
    };

    restoreSessionAndLap();
  }, []);

  const startSession = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await api.post("/session/start");

      setSession({
        sessionId: data.sessionId,
        startTime: data.startTime,
      });
      console.log("Session started:", data);
    } catch (err) {
      if (err.response?.status === 400 && err.response?.data?.sessionId) {
        setSession({
          sessionId: err.response.data.sessionId,
          startTime: err.response.data.startTime,
        });
        setError(null); // Clear error, and session restored
        return;
      }

      setError(err.response?.data?.error || "Failed to start session");
    } finally {
      setLoading(false);
    }
  };

  // END SESSION
  const endSession = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.post("/session/end", {
        sessionId: session.sessionId,
      });

      console.log("Session ended:", data);

      setSession(null); // clearing active session
      setLap(null);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to end session");
    } finally {
      setLoading(false);
    }
  };

  // START LAP
  const startLap = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.post("/session/lap/start", {
        sessionId: session.sessionId,
      });

      console.log("Lap started:", data);
      //   setLap(data);
      setLap({
        lapId: data.lapId,
        startTime: data.lapStart,
      });
    } catch (err) {
      // restore lap if backend says one exists
      if (err.response?.data?.lapId) {
        setLap({
          lapId: err.response.data.lapId,
          startTime: err.response.data.lapStart,
        });
        return;
      }
      setError(err.response?.data?.error || "Failed to start lap");
    } finally {
      setLoading(false);
    }
  };

  // END LAP
  const endLap = async () => {
    try {
      setLoading(true);
      setError("");

      const { data } = await api.post("/session/lap/end", {
        lapId: lap.lapId,
      });

      console.log("Lap ended:", data);

      setLap(null); // clear active lap
    } catch (err) {
      setError(err.response?.data?.error || "Failed to end lap");
    } finally {
      setLoading(false);
    }
  };

  if (restoring) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Restoring session...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-6">
        {/* STATUS CARD */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <StatusCard
            title="Session"
            active={!!session} // it converts any value into strict booolen
            startTime={session?.startTime}
          />
          <StatusCard title="Lap" active={!!lap} startTime={lap?.startTime} />
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-4 ">
          <ActionButton
            label="Start Session"
            color="green"
            // disabled={restoring || !!session || loading}
            disabled={loading || restoring || !!session}
            onClick={startSession}
          />

          <ActionButton
            label="End Session"
            color="red"
            // disabled={restoring || !session || loading}
            disabled={loading || restoring || !session}
            onClick={endSession}
          />

          <ActionButton
            label="Start Lap"
            color="yellow"
            disabled={!session || !!lap || loading}
            onClick={startLap}
          />

          <ActionButton
            label="End Lap"
            color="blue"
            disabled={!lap || loading}
            onClick={endLap}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
