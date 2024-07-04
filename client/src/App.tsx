import { useState, useEffect } from "react";
import "./App.css";
import { BackendService } from "@genezio-sdk/genezio-web-scraper";

export default function App() {
  const [stars, setStars] = useState<number>(); // store website data ()

  const fetchGithubStars = async () =>
    setStars(parseInt(await BackendService.getGitHubStars()));

  useEffect(() => {
    fetchGithubStars();
    const intervalId = setInterval(() => {
      fetchGithubStars();
    }, 3000); // Send this request every 3 seconds to get almost real-time results."
    return () => clearInterval(intervalId);
  }, []);

  return <>{stars && <h1>{stars} stars</h1>}</>;
}
