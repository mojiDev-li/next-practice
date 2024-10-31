import GlobalLayout from "@/components/global-layout";
// import SearchableLayout from "@/components/searchable-layout";
import "@/styles/globals.css";
import { NextPage } from "next";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

// 이 타입은 next에서 제공하는 NextPage이고 getLayout이라는 안에 정의된 함수가 추가된 타입 ?는 해당 속성이 없을 수도 있어서 optional하게 한거임
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;
}

export default function App({ Component, pageProps }: AppProps & {
  Component: NextPageWithLayout
}) {

  const getLayout = Component.getLayout ?? ((page: ReactNode) => page);
  return (
    <GlobalLayout>
      {getLayout(<Component {...pageProps} />)}
    </GlobalLayout>
  );
}
