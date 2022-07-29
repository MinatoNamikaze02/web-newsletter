import '../styles/globals.css'
import 'katex/dist/katex.min.css';

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps}  suppressHydrationWarning  />
}

export default MyApp
