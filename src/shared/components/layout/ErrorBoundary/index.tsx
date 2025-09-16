"use client";

import React, { Component, ErrorInfo } from "react";

import * as Sentry from "@sentry/nextjs";

import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from "@/shared/interfaces/common";

import { ErrorFallback } from "./errorFallBackFile";

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // eslint-disable-next-line local-rules/enforce-single-object-param
  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "production") {
      Sentry.captureException(error);
      Sentry.captureMessage("Error info: " + JSON.stringify(info));
    } else {
      console.error("Error caught by ErrorBoundary:", error, info);
    }
  }

  resetError = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      const { fallback } = this.props;

      return <div>{fallback || <ErrorFallback />}</div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
