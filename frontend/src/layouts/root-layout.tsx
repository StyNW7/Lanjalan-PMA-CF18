import SiteHeader from "@/components/Navbar";
import SiteFooter from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Outlet } from "react-router";

function RootLayout() {
    return (
        <ThemeProvider defaultTheme="light" storageKey="lanjalan-ui-theme">
            <SiteHeader />
            <div className="relative flex min-h-svh flex-col bg-background">
                <Outlet />
                <SiteFooter />
            </div>
        </ThemeProvider>
    );
}

export default RootLayout;