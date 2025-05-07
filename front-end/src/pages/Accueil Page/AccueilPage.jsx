import Posts from "../../components/pages/Publications/Posts";
import useAuthLoader from "../../hooks/useAuthLoader";

function AccueilPage() {
  useAuthLoader();
  return (
    <>
      <Posts />
    </>
  );
}

export default AccueilPage;
