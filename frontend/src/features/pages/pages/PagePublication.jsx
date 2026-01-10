import { useSelector } from "react-redux";
import PageHeader from "@/features/pages/components/PageHeader";
import PageAbout from "@/features/pages/components/PageAbout";
import CurrentPagePosts from "@/features/pages/components/CurentPagePosts";
import PagePosts from "@/features/pages/components/PagePosts";
function PagePublication() {
  const state = useSelector((state) => state.page);

  return (
    state.page.id && (
      <div className="md:min-w-full px-2 mx-auto pb-6 w-full min-h-screen">
        <div className="w-64"></div>
        <div className="flex flex-col">
          <div className="w-full">
            <div className="flex w-full lg:flex-row flex-col justify-center md:px-2 mt-4 gap-4 overflow:hidden">
              <div className="lg:w-[45%] w-full">
                <PageAbout />
              </div>
              <PagePosts />
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default PagePublication;
