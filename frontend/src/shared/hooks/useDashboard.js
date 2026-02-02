// import { useState, useEffect } from "react";
// import axios from "axios";

// export const useDashboard = () => {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [data, setData] = useState({
//     overviewStats: null,
//     postsAnalytics: null,
//     popularityInsights: null,
//     userReports: null,
//     overview: null,
//   });

//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         const [
//           overviewStatsRes,
//           postsAnalyticsRes,
//           popularityInsightsRes,
//           userReportsRes,
//           overviewRes,
//         ] = await Promise.all([
//           axios.get("/api/dashboard/overview-stats"),
//           axios.get("/api/dashboard/posts-analytics"),
//           axios.get("/api/dashboard/popularity-insights"),
//           axios.get("/api/dashboard/user-reports"),
//           axios.get("/api/dashboard/overview"),
//         ]);

//         setData({
//           overviewStats: overviewStatsRes.data,
//           postsAnalytics: postsAnalyticsRes.data,
//           popularityInsights: popularityInsightsRes.data,
//           userReports: userReportsRes.data,
//           overview: overviewRes.data,
//         });
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDashboardData();
//   }, []);

//   return { data, loading, error };
// };


import { useState, useEffect } from "react";
import api from "@/lib/api";

export const useDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    overviewStats: null,
    postsAnalytics: null,
    popularityInsights: null,
    userReports: null,
    overview: null,
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        const [
          overviewStatsRes,
          postsAnalyticsRes,
          popularityInsightsRes,
          userReportsRes,
          overviewRes,
        ] = await Promise.all([
          api.get("/api/dashboard/overview-stats"),
          api.get("/api/dashboard/posts-analytics"),
          api.get("/api/dashboard/popularity-insights"),
          api.get("/api/dashboard/user-reports"),
          api.get("/api/dashboard/overview"),
        ]);

        setData({
          overviewStats: overviewStatsRes.data,
          postsAnalytics: postsAnalyticsRes.data,
          popularityInsights: popularityInsightsRes.data,
          userReports: userReportsRes.data,
          overview: overviewRes.data,
        });
      } catch (err) {
        console.error("Error fetching dashboard:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { data, loading, error };
};
