import HomePage from "./components/HomePage"
import { ThemeProvider } from "@/components/theme-provider"

function App() {

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <HomePage />
    </ThemeProvider>
  )
}

export default App
