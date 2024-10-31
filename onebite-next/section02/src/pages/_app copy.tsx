import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

// Component props의 경우 현재 보여줄 page 컴포넌트
// pageProps props의 경우 보여줄 page 컴포넌트에 전달될 props들을 객체로 보관한 것.
// 만약 모든 페이지에서 보여줄 header나 footer가 있다면 이 파일에 return문에 적어주면됨
/*
export default function App({ Component, pageProps }: AppProps) {
  return 
    <Component {...pageProps} />;
}
*/

// CSR 방식으로 페이지 이동시키는 방법 -> Link로 하기
export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/test') // 해당 페이지가 mount될 때 자동으로 pre-fetching 되지 않은 페이지를 pre-fetching 되도록 하는 코드
  }, []);

  const onClickButton = () => {
    router.push("/test"); // CSR 방식으로 페이지 이동하는 방식
    // router.replace 뒤로가기 방지
  };

  return (
    <>
      <header>
        <Link href={'/'}>index</Link> 
        &nbsp;
        <Link href={'/search'} prefetch={false}>search</Link>
        &nbsp;
        <Link href={'/book/1'}>book/1</Link>
        <div>
          <button onClick={onClickButton}>/test 페이지로 이동</button>
        </div>
      </header>
      <Component {...pageProps} />
    </>
  );
}
