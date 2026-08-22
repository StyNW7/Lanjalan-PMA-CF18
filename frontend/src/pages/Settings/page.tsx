import { Settings as SettingsIcon, Moon, Sun, Globe, Bell, ShieldCheck, LogOut } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useTheme } from "@/components/theme-provider"
import { Link, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()

  function handleSignOut() {
    toast.success("Signed out. Your saved trips stay on this device.")
    navigate("/")
  }

  return (
    <div className="container max-w-2xl py-10">
      <h1 className="flex items-center gap-2 text-2xl font-extrabold text-foreground">
        <SettingsIcon className="h-5 w-5 text-primary" /> Settings
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">Manage how Lanjalan looks and behaves for you.</p>

      <div className="mt-8 space-y-6">
        <Card className="p-6">
          <h2 className="font-bold text-foreground">Appearance</h2>
          <div className="mt-4 flex items-center justify-between">
            <Label className="flex items-center gap-2 text-sm font-normal text-foreground">
              {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />} Theme
            </Label>
            <Select value={theme} onValueChange={(v) => setTheme(v as typeof theme)}>
              <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-bold text-foreground"><Globe className="h-4 w-4" /> Language & Region</h2>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label className="text-sm">Language</Label>
              <Select defaultValue="en">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="id">Bahasa Indonesia</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Currency</Label>
              <Select defaultValue="idr">
                <SelectTrigger className="mt-1.5"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="idr">IDR (Rp)</SelectItem>
                  <SelectItem value="usd">USD ($)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-bold text-foreground"><Bell className="h-4 w-4" /> Notifications</h2>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal text-foreground">Email notifications</Label>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label className="text-sm font-normal text-foreground">Push notifications</Label>
              <Switch defaultChecked />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="flex items-center gap-2 font-bold text-foreground"><ShieldCheck className="h-4 w-4" /> Privacy</h2>
          <p className="mt-1 text-sm text-muted-foreground">Manage what Compass can use to personalize your trips.</p>
          <Button asChild variant="outline" size="sm" className="mt-3">
            <Link to="/privacy">Open Privacy Settings</Link>
          </Button>
        </Card>

        <Card className="border-destructive/30 p-6">
          <h2 className="flex items-center gap-2 font-bold text-destructive"><LogOut className="h-4 w-4" /> Sign Out</h2>
          <p className="mt-1 text-sm text-muted-foreground">You'll need to sign in again to access your trips.</p>
          <Button variant="destructive" size="sm" className="mt-3 gap-1.5" onClick={handleSignOut}>
            <LogOut className="h-3.5 w-3.5" /> Sign Out
          </Button>
        </Card>
      </div>
    </div>
  )
}
