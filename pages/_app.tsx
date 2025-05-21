import "@/styles/app.css";
import type { AppProps } from "next/app";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";

// Configure Amplify with empty configuration
// This will use default settings from the Amplify backend
Amplify.configure({});

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
