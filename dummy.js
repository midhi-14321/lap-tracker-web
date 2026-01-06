// START SESSION
  //   const startSession = async () => {
  //     try {
  //       setLoading(true);
  //       setError(null);

  //       const { data } = await api.post("/session/start");
  //       console.log("SESSION START:", data);

  //       //   setSession(data);
  //       setSession({
  //         sessionId: data.sessionId,
  //         startTime: data.startTime,
  //       });
  //     } catch (err) {
  //       console.error(err);
  //       setError(err.response?.data?.error || "Failed to start session");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };


  // useEffect(() => {
  //   const restoreSession = async () => {
  //     try {
  //       const { data } = await api.get("/session/active");
  //       if (data.session) {
  //         setSession({
  //           sessionId: data.session.id,
  //           startTime: data.session.startTime,
  //         });
  //       }
  //     } catch (err) {
  //       console.log("No active session");
  //     } finally {
  //       // setRestoring(false);
  //       setTimeout(() => setRestoring(false), 100);
  //     }
  //   };
  //   restoreSession();
  // }, []);
