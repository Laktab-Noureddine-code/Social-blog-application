import { useSelector } from "react-redux";
import PageHeader from "./PageHeader";
import PageAbout from "./PageAbout";
import CurrentPagePosts from "./CurentPagePosts";
import PagePosts from "./PagePosts";
function PagePublication() {
  const state = useSelector((state) => state.page);
  console.log('hello world ',state)

  return (
    state.page.id && (
      <div className="md:min-w-full px-2 mx-auto pb-6 w-full min-h-screen">
        <div className="w-64"></div>
        <div className="flex flex-col">
          <div className="w-full">
            <PageHeader />
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
