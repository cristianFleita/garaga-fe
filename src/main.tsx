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
import initNoirC from "@noir-lang/noirc_abi";
import initACVM from "@noir-lang/acvm_js";
import acvm from "@noir-lang/acvm_js/web/acvm_js_bg.wasm?url";
import noirc from "@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm?url";

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

    const initWasm = async () => {
      try {
        // This might have already been initialized in main.tsx,
        // but we're adding it here as a fallback
        if (typeof window !== "undefined") {
          await Promise.all([initACVM(fetch(acvm)), initNoirC(fetch(noirc))]);
          console.log("WASM initialization in App component complete");
        }
      } catch (error) {
        console.error("Failed to initialize WASM in App component:", error);
      }
    };
    const wasmPromise = initWasm();

    const [setupResult] = await Promise.all([
      setupPromise,
      garagaPromise,
      wasmPromise,
    ]);

    setCanFadeOut(true);

    setTimeout(() => {
      renderApp(setupResult);
    });
  } catch (e) {
    console.error(e);
  }
}

init();
