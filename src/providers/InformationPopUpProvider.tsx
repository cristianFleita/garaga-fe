import {
  PropsWithChildren,
  ReactNode,
  createContext,
  useContext,
  useState,
} from "react";
import { InformationPopUp } from "../components/InformationPopUp";

interface IInformationPopUpContext {
  information: ReactNode | undefined;
  setInformation: (information: ReactNode) => void;
  onClose: () => void;
}

const InformationPopUpContext = createContext<IInformationPopUpContext>({
  information: undefined,
  setInformation: (_) => {},
  onClose: () => {},
});
export const useInformationPopUp = () => useContext(InformationPopUpContext);

export const InformationPopUpProvider = ({ children }: PropsWithChildren) => {
  const [information, setInformation] = useState<ReactNode | undefined>();

  const onClose = () => {
    setInformation(undefined);
  };

  return (
    <InformationPopUpContext.Provider
      value={{
        information,
        setInformation,
        onClose,
      }}
    >
      {children}
      {information && (
        <InformationPopUp
          content={information}
          onClose={() => setInformation(undefined)}
        />
      )}
    </InformationPopUpContext.Provider>
  );
};
