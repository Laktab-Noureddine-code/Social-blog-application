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
import axios from "axios";

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
      const token = localStorage.getItem("access_token"); // Récupère ton token JWT ici

      if (!token) {
        setError("Token d'authentification manquant.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const [
          overviewStatsRes,
          postsAnalyticsRes,
          popularityInsightsRes,
          userReportsRes,
          overviewRes,
        ] = await Promise.all([
          axios.get("/api/dashboard/overview-stats", config),
          axios.get("/api/dashboard/posts-analytics", config),
          axios.get("/api/dashboard/popularity-insights", config),
          axios.get("/api/dashboard/user-reports", config),
          axios.get("/api/dashboard/overview", config),
        ]);

        setData({
          overviewStats: overviewStatsRes.data,
          postsAnalytics: postsAnalyticsRes.data,
          popularityInsights: popularityInsightsRes.data,
          userReports: userReportsRes.data,
          overview: overviewRes.data,
        });
      } catch (err) {
        console.error("Erreur lors de la récupération du dashboard:", err);
        setError(err.message || "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return { data, loading, error };
};
