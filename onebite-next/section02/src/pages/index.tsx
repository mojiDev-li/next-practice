// import '@/pages/index.css' App 컴포넌트에서만 글로벌하게 import 가능함

// CSS Module : 이렇게 module이라는 이름을 넣어주고 style로 import해 className 같은걸 줘야함
import SearchableLayout from "@/components/searchable-layout";
import style from "./index.module.css";
import { ReactNode } from "react";
import BookItem from "@/components/book-item";
import { InferGetStaticPropsType } from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books";
import Head from "next/head";

// next에서 사용하는 예약 함수를 명시함으로써 해당 페이지는 자동으로 서버사이드렌더링을 시작함
// 반드시 객체를 반환해야하고 안에는 객체타입의 props가 들어있어야함
// 오직 서버측에서만 실행되는 함수
// 그리고 딱 한번만 실행
// 브라우저에서 사용되는 함수는 당연히 사용할 수 없음
/*export const getServerSideProps = async () => {
  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수
  // const data = 'hello';

  // console.log('hihi')
  // return {
  //   props: { data }
  // }

  // 2개의 비동기 함수를 직렬 순서로 호출하고 기다리는 함수
  // const allBooks = await fetchBooks();
  // const recoBooks = await fetchRandomBooks();

  // 2개의 비동기 함수를 동시에 호출하고 실행하는 부분 -> 위 함수를 개선함
  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(), fetchRandomBooks()
  ])

  return {
    props: {
      allBooks,
      recoBooks
    }
  }
};*/

// 이렇게 하면 SSG 방식으로 해당 페이지를 렌더링함
export const getStaticProps = async () => {

  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(), fetchRandomBooks()
  ])

  return {
    props: {
      allBooks,
      recoBooks
    },
    // revalidate: 3 // 3초 -> 재검증 -> ISR이 적용되는 거임

  }
}

//InferGetServerSidePropsType : 자동으로 제너릭으로 넘겨준 객체의 타입을 추론해줌, SSR방식
// export default function Home({ allBooks, recoBooks }: InferGetServerSidePropsType<typeof getServerSideProps>) {

// SSG방식
export default function Home({ allBooks, recoBooks }: InferGetStaticPropsType<typeof getStaticProps>) {
  // window.location : 해당 페이지가 서버사이드 렌더링으로 바꾸면서 해당 부분도 오류가 발생함
  // useEffect(() => { console.log(window) }, []) : 이 방식으로 브라우저를 제어할 수 있음 -> 페이지가 마운트 된 후 실행됨
  // console.log(allBooks);

  // <meta property="og:image" content="/thumbnail.png" /> : /경로는 public을 의미하며, og:image는 썸네일을 설정하는것임


  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => <BookItem key={book.id} {...book} />)}
        </section>
      </div>
    </>
  );
}

// 메서드를 추가함 자바스크립트에서 함수는 사실 객체여서 이렇게 함수를 만들 수 있음
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}