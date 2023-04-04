import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import ThemeContextProvider from "@/components/theme/ThemeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement | ReactNode) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <SessionProvider session={session}>
      <ThemeContextProvider>
        <Provider store={store}>
          <Head>
            <title>Aung Sport Wear</title>
            <meta name="description" content="This is aung sportwear" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <link rel="icon" href="/football.png" />
          </Head>
          <main>
            {getLayout(
              <>
                <ToastContainer draggable />
                <Component {...pageProps} />
              </>
            )}
          </main>
        </Provider>
      </ThemeContextProvider>
    </SessionProvider>
  );
}
