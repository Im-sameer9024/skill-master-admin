import React, { Suspense, lazy } from "react";
import Sidebar from "./components/common/Sidebar/Sidebar";
import Navbar from "./components/common/Navbar/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Spinner from "./components/common/Spinner";
import NotFoundPage from "./pages/NotFoundPage";

// Lazy load all page components
const DashboardPage = lazy(() => import("./pages/Dashboard"));
const BlogsPage = lazy(() => import("./pages/Blogs"));
const AboutUsPage = lazy(() => import("./pages/About-Us"));
const TermsConditionPage = lazy(() => import("./pages/Terms-Conditions"));
const PrivacyPolicyPage = lazy(() => import("./pages/Privacy-Policy"));
const UsersPage = lazy(() => import("./pages/Users"));
const FaqPage = lazy(() => import("./pages/FAQ"));
const PlansPage = lazy(() => import("./pages/Plans"));
const NotificationPage = lazy(() => import("./pages/Notification"));
const CategoryPage = lazy(() => import("./pages/Category"));
const ListeningPage = lazy(() => import("./pages/Listening"));
const ListeningItemsPage = lazy(() => import("./pages/ListeningItems"));
const ListeningItemsAudioPage = lazy(() =>
  import("./pages/ListeningItemsAudio")
);
const ListeningQuestionsPage = lazy(() => import("./pages/ListeningQuestions"));

const App = () => {
  const path = useLocation().pathname;

  return (
    <div className="flex w-full h-screen">
      <Sidebar path={path} />
      <div className="flex flex-col w-full h-full">
        <Navbar />
        <div className="flex-1 p-4 overflow-y-auto">
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route path="/" element={<DashboardPage />} />

              {/* ----------------------cms routes-----------------------  */}
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/cms/about" element={<AboutUsPage />} />
              <Route
                path="/cms/terms-conditions"
                element={<TermsConditionPage />}
              />
              <Route
                path="/cms/privacy-policy"
                element={<PrivacyPolicyPage />}
              />
              <Route path="/cms/faq" element={<FaqPage />} />

              {/* ----------------------users routes-----------------------  */}
              <Route path="/users" element={<UsersPage />} />

              {/* ----------------------plans routes-----------------------  */}
              <Route path="/plans" element={<PlansPage />} />

              {/* ----------------------Notification routes-----------------------  */}
              <Route path="/notification" element={<NotificationPage />} />

              <Route path="/categories" element={<CategoryPage />} />

              {/* ----------------------Listening routes-----------------------  */}
              <Route path="/listening" element={<ListeningPage />} />
              <Route
                path="/listening/items/:listening_id"
                element={<ListeningItemsPage />}
              />
              <Route
                path="/listening/item/audios/:listening_item_id"
                element={<ListeningItemsAudioPage />}
              />
              <Route
                path="/listening/item/question/:listening_item_id/:audio_id"
                element={<ListeningQuestionsPage />}
              />

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default App;
