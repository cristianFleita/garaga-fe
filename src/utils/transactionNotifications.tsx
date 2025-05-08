import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";
import { Box, Flex, Image, Spinner, Text, Tooltip } from "@chakra-ui/react";
import { shortenHex } from "@dojoengine/utils";
import { MouseEventHandler } from "react";
import { isMobile } from "react-device-detect";
import { ExternalToast, toast } from "sonner";

import {
  ERROR_TOAST,
  LOADING_TOAST,
  SUCCESS_TOAST,
  VIOLET_LIGHT,
} from "../theme/colors.tsx";
import { getEnvString } from "./getEnvValue.ts";

const TOAST_COMMON_OPTIONS: ExternalToast = {
  id: "transaction",
  position: "top-left",
  closeButton: false,
  dismissible: true,
  style: {
    padding: 0,
    backgroundColor: "transparent",
    boxShadow: "none",
    left: "12px",
    width: "30px",
  },
  duration: 1750,
};

type CircularToastProps = {
  backgroundColor: string;
  status: "loading" | "success" | "error";
  description?: string;
  onClickFn?: MouseEventHandler<HTMLDivElement>;
};

const CircularToast = ({
  backgroundColor,
  status,
  description,
  onClickFn,
}: CircularToastProps) => (
  <Tooltip
    placement="right"
    label={description}
    closeOnPointerDown
    color="white"
    backgroundColor={backgroundColor}
    padding={2}
    isDisabled={!description}
  >
    <Box
      width={isMobile ? "20px" : "30px"}
      height={isMobile ? "20px" : "30px"}
      bg={backgroundColor}
      borderRadius="50%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      onClick={onClickFn}
      cursor={onClickFn ? "pointer" : "default"}
    >
      {status === "loading" ? (
        <Spinner
          boxSize={isMobile ? 10 : 20}
          thickness="2px"
          speed="0.65s"
          color="white"
          size="xl"
        />
      ) : status === "success" ? (
        <CheckCircleIcon boxSize={isMobile ? "12px" : "20px"} color="white" />
      ) : (
        <WarningIcon boxSize={isMobile ? "12px" : "20px"} color="white" />
      )}
    </Box>
  </Tooltip>
);

export const showTransactionToast = (
  transaction_hash?: string,
  message?: string
): void => {
  const description = message || "Transaction in progress...";

  toast.loading(
    <CircularToast
      backgroundColor={LOADING_TOAST}
      status="loading"
      description={description}
    />,
    {
      ...TOAST_COMMON_OPTIONS,
    }
  );
};

const openTx = function (transaction_hash: string): void {
  window.open(getEnvString("VITE_TRANSACTIONS_URL") + transaction_hash);
};

export const updateTransactionToast = (
  transaction_hash: string,
  succeed: boolean
): boolean => {
  const backgroundColor = succeed ? SUCCESS_TOAST : ERROR_TOAST;
  const description = shortenHex(transaction_hash, 15);

  if (succeed) {
    toast.success(
      <CircularToast
        backgroundColor={backgroundColor}
        status={"success"}
        onClickFn={() => openTx(transaction_hash)}
      />,
      {
        ...TOAST_COMMON_OPTIONS,
      }
    );
  } else {
    toast.error(
      <CircularToast
        backgroundColor={backgroundColor}
        status={"error"}
        description={description}
        onClickFn={() => openTx(transaction_hash)}
      />,
      {
        ...TOAST_COMMON_OPTIONS,
      }
    );
  }
  return succeed;
};

export const failedTransactionToast = (): boolean => {
  const TX_ERROR_MESSAGE = "Error processing transaction.";
  toast.error(
    <CircularToast
      backgroundColor={ERROR_TOAST}
      status="error"
      description={TX_ERROR_MESSAGE}
    />,
    {
      ...TOAST_COMMON_OPTIONS,
    }
  );

  return false;
};
