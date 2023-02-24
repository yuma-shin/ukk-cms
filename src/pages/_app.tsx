import type { AppProps } from 'next/app'
import { ChakraProvider,extendTheme } from '@chakra-ui/react';
import Fonts from 'components/Fonts'
import 'style/style.css'

const fonts = {
  //heading: "'M PLUS Rounded 1c'",
  body: "'Noto Sans JP'"
}

const theme = extendTheme({ fonts })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp