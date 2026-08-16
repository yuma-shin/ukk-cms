import type { AppProps } from "next/app";
import {
  ChakraProvider,
  createSystem,
  defaultConfig,
  defineConfig,
} from "@chakra-ui/react";
import Fonts from "components/Fonts";
import "style/style.css";

const config = defineConfig({
  theme: {
    tokens: {
      fonts: {
        body: { value: "'Noto Sans JP', sans-serif" },
      },
    },
  },
});

const system = createSystem(defaultConfig, config);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider value={system}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
