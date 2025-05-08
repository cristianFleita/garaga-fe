import { ChakraBaseProvider, extendTheme } from "@chakra-ui/react";
import "./App.scss";

import { AppRoutes } from "./AppRoutes";
import customTheme from "./theme/theme";
import { GameProvider } from "./providers/GameProvider";
import { InformationPopUpProvider } from "./providers/InformationPopUpProvider";

function App() {
  const theme = extendTheme(customTheme);

  return (
    <ChakraBaseProvider theme={theme}>
      <GameProvider>
        <InformationPopUpProvider>
          <AppRoutes />
        </InformationPopUpProvider>
      </GameProvider>
    </ChakraBaseProvider>
  );
}

export default App;
