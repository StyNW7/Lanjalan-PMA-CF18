// Default Import

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Layout

import Layout from "@/layouts/root-layout";
import { AppStateProvider } from "@/context/app-state";

// Utility Pages / Components

import ScrollToTop from "./utility/ScrollToTop";
import ScrollToTopFunction from "./utility/ScrollToTopFunction";
import NotFoundPage from "./pages/Utility/NotFound404";

// Pages

import LandingPage from "@/pages/Landing/page";
import AboutPage from "@/pages/About/page";
import OnboardingPage from "@/pages/Onboarding/page";

import FlightSearchPage from "@/pages/Flights/SearchPage";
import FlightResultsPage from "@/pages/Flights/ResultsPage";
import FlightCheckoutPage from "@/pages/Flights/CheckoutPage";
import BookingSuccessPage from "@/pages/BookingSuccess/page";

import HotelSearchPage from "@/pages/Hotels/SearchPage";
import HotelResultsPage from "@/pages/Hotels/ResultsPage";
import HotelDetailPage from "@/pages/Hotels/DetailPage";

import ActivitySearchPage from "@/pages/Activities/SearchPage";
import ActivityResultsPage from "@/pages/Activities/ResultsPage";
import ActivityDetailPage from "@/pages/Activities/DetailPage";

import ExplorePage from "@/pages/Explore/page";
import DealsPage from "@/pages/Deals/page";
import DestinationDetailPage from "@/pages/Destinations/DetailPage";

import CompassIntroPage from "@/pages/Compass/IntroPage";
import CompassPreferencesPage from "@/pages/Compass/PreferencesPage";
import CompassGeneratingPage from "@/pages/Compass/GeneratingPage";
import CompassTripWorkspacePage from "@/pages/Compass/TripWorkspacePage";

import MyTripsPage from "@/pages/Trips/MyTripsPage";
import TripDetailPage from "@/pages/Trips/TripDetailPage";

import TransactionsPage from "@/pages/Transactions/page";
import NotificationsPage from "@/pages/Notifications/page";
import SavedPage from "@/pages/Saved/page";
import ProfilePage from "@/pages/Profile/page";
import SettingsPage from "@/pages/Settings/page";
import PrivacyPage from "@/pages/Privacy/page";
import HelpPage from "@/pages/Help/page";

function App() {

  return (

    // Providers, Router, Scroll to Top Function and Button, and Custom Cursor

    <AppStateProvider>
      <BrowserRouter>
        <ScrollToTopFunction />
        <ScrollToTop />

            <Routes>

              <Route path="/" element={<Layout />}>

                  <Route index element={<LandingPage/>} />
                  <Route path="about" element={<AboutPage />} />
                  <Route path="onboarding" element={<OnboardingPage />} />

                  <Route path="flights" element={<FlightSearchPage />} />
                  <Route path="flights/results" element={<FlightResultsPage />} />
                  <Route path="flights/checkout" element={<FlightCheckoutPage />} />
                  <Route path="booking-success" element={<BookingSuccessPage />} />

                  <Route path="hotels" element={<HotelSearchPage />} />
                  <Route path="hotels/results" element={<HotelResultsPage />} />
                  <Route path="hotels/:id" element={<HotelDetailPage />} />

                  <Route path="activities" element={<ActivitySearchPage />} />
                  <Route path="activities/results" element={<ActivityResultsPage />} />
                  <Route path="activities/:id" element={<ActivityDetailPage />} />

                  <Route path="explore" element={<ExplorePage />} />
                  <Route path="destinations/:id" element={<DestinationDetailPage />} />
                  <Route path="deals" element={<DealsPage />} />

                  <Route path="compass" element={<CompassIntroPage />} />
                  <Route path="compass/preferences" element={<CompassPreferencesPage />} />
                  <Route path="compass/generating" element={<CompassGeneratingPage />} />
                  <Route path="compass/trip/:id" element={<CompassTripWorkspacePage />} />

                  <Route path="trips" element={<MyTripsPage />} />
                  <Route path="trips/:id" element={<TripDetailPage />} />

                  <Route path="transactions" element={<TransactionsPage />} />
                  <Route path="notifications" element={<NotificationsPage />} />
                  <Route path="saved" element={<SavedPage />} />
                  <Route path="profile" element={<ProfilePage />} />
                  <Route path="settings" element={<SettingsPage />} />
                  <Route path="privacy" element={<PrivacyPage />} />
                  <Route path="help" element={<HelpPage />} />

              </Route>

              <Route path="*" element={<NotFoundPage />} />

            </Routes>

        <Toaster position="top-center" />

      </BrowserRouter>
    </AppStateProvider>

  );
}

export default App;
