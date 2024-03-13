// import "@/styles/globals.css";
import type { AppProps } from "next/app";
import '@mantine/tiptap/styles.css';
import 'react-quill/dist/quill.snow.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Component {...pageProps} />
  );
}
