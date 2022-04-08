import { CheckIcon, ExclamationTriangleIcon, InfoCircledIcon } from "@radix-ui/react-icons";
import React from "react";
import { ColorConfig, GradientConfig, NotifyConfig } from "../types/setup";
import { fixMessage } from "./helpers";

export const defaultColors: ColorConfig = {
  error: 'red',
  info: 'violet',
  primary: 'blue',
  secondary: 'pink',
  success: 'teal',
  warn: 'yellow'
};

export const defaultGradients: GradientConfig = {
  error: { from: 'red', to: 'pink' },
  info: { from: 'indigo', to: 'grape' },
  primary: { from: 'cyan', to: 'indigo' },
  secondary: { from: 'pink', to: 'grape' },
  success: { from: 'cyan', to: 'green' },
  warn: { from: 'yellow', to: 'orange' }
};

export const defaultNotify: NotifyConfig = {
  autoClose: 5000,
  limit: 5,
  position: 'bottom-center',
  icons: {
    error: <ExclamationTriangleIcon />,
    info: <InfoCircledIcon />,
    success: <CheckIcon />
  },
  messageWrappers: {
    error: (message: string) => `${fixMessage(message)} If issue persists contact support`,
    info: (message: string) => fixMessage(message),
    loading: (message: string) => fixMessage(message),
    success: (message: string) => fixMessage(message),
  }
};