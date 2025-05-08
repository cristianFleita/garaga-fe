import { PropsWithChildren } from "react";

export const PreThemeLoadingPage = ({ children }: PropsWithChildren) => {
  return (
    <div
      style={{
        height: "100%",
        position: "fixed",
        bottom: 0,
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Orbitron",
        fontSize: 30,
        letterSpacing: "0.25em",
        background: `url(images/bg_06.gif) center center / cover no-repeat`,
        flexWrap: "wrap",
      }}
    >
      {children}
    </div>
  );
};
