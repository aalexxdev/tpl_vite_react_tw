import { LoginForm } from "@/components/login-form";

import { ModeToggle } from "@/components/mode-toggle";
import "./App.css";
import LanguageSwitcher from "@/components/language-switcher";
import LetterGlitch from "@/components/LetterGlitch";

function App() {
  return (
    <>
      <div className="z-10 bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
        <ModeToggle />
        <LanguageSwitcher />
        <div className="w-full max-w-sm md:max-w-3xl z-10">
          <LoginForm />
        </div>
      </div>
      <LetterGlitch glitchSpeed={100} smooth={true} />
    </>
  );
}

export default App;
