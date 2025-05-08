import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { dojoConfig } from "../dojoConfig.ts";
import App from "./App.tsx";

import i18n from "i18next";
import { DojoProvider } from "./dojo/DojoContext.tsx";
import { setup } from "./dojo/setup.ts";
import "./index.css";
// import { LoadingScreen } from "./pages/LoadingScreen/LoadingScreen.tsx";
import { StarknetProvider } from "./providers/StarknetProvider.tsx";
// import { preloadImages, preloadVideos } from "./utils/cacheUtils.ts";
// import { preloadSpineAnimations } from "./utils/preloadAnimations.ts";
// import { registerServiceWorker } from "./utils/registerServiceWorker.ts";
import { ChakraBaseProvider, extendTheme } from "@chakra-ui/react";
import customTheme from "./theme/theme";
import { init as start } from "garaga";

const I18N_NAMESPACES = [
  "game",
  "home",
  "store",
  "cards",
  "tutorials",
  "intermediate-screens",
  "plays",
  "achievements",
  "map",
];

async function init() {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("React root not found");
  const root = ReactDOM.createRoot(rootElement);

  let setCanFadeOut: (value: boolean) => void = () => {};

  const theme = extendTheme(customTheme);

  const renderApp = (setupResult: any) => {
    const queryClient = new QueryClient();
    root.render(
      // <FadeInOut isVisible fadeInDelay={shouldSkipPresentation ? 0.5 : 1.5}>
      <StarknetProvider>
        <DojoProvider value={setupResult}>
          <BrowserRouter>
            <QueryClientProvider client={queryClient}>
              <Toaster />
              {/* <I18nextProvider i18n={localI18n} defaultNS={undefined}> */}
              <App />
              {/* </I18nextProvider> */}
            </QueryClientProvider>
          </BrowserRouter>
        </DojoProvider>
      </StarknetProvider>
      // </FadeInOut>
    );
  };

  try {
    const setupPromise = setup(dojoConfig);
    const garagaPromise = start();

    const [setupResult] = await Promise.all([setupPromise, garagaPromise]);

    setCanFadeOut(true);

    setTimeout(() => {
      renderApp(setupResult);
    });
  } catch (e) {
    console.error(e);
  }
}

init();
