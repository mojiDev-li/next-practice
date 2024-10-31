import { Html, Head, Main, NextScript } from "next/document";

// 여기는 모든 페이지에서의 html 코드 속성을 정의하는 곳
// 모든 페이지에 적용이 되는 파일
// 모든 페이지에 적용이 되어야하는 메타 셋, 폰트, 구글 애널리틱스 같은거 관리할 때 사용
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
