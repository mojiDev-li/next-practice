import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { Suspense } from "react";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { Metadata } from "next";


// 특정 페이지의 유형을 강제로 static, dynamic 페이지로 설정
// 데이터 캐싱 이런거 다 떠나서 강제로 설정이 가능함
// 1. auto : 자동, 기본값, 아무것도 강제하지 않음
// 2. force-dynamic : 페이지를 강제로 동적 페이지로 설정. 
// 3. force-static : 페이지를 강제로 정적 페이지로 설정. 어떤 데이터 페칭이던, 동적 함수를 쓰던 정적 페이지로 설정
// 4. error : 페이지를 강제로 정적 페이지로 설정, 동적 함수나, 데이터 페칭에 대해 정적 페이지로 설정하면 안되는경우 빌드 오류를 발생
// export const dynamic = "force-dynamic"


async function AllBooks() {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`, { cache: "force-cache" });
  if (!response.ok) {
    return (
      <div>
        오류가 발생했습니다...
      </div>
    )
  }
  const allBooks: BookData[] = await response.json();

  return (
    <div>
      {allBooks.map((book) => <BookItem key={book.id} {...book} />)}
    </div>
  )
}

async function RecoBooks() {

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, { next: { revalidate: 3 } });
  if (!response.ok) {
    return (
      <div>
        오류가 발생했습니다.
      </div>
    )
  }

  const recoBooks: BookData[] = await response.json();

  return (
    <div>
      {recoBooks.map((book) => <BookItem key={book.id} {...book} />)}
    </div>
  )
}

// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: '한입 북스',
  description: "한입 북스에 등록된 도서를 만나보세요.",
  openGraph: {
    title: '한입 북스',
    description: "한입 북스에 등록된 도서를 만나보세요.",
    images: ['/thumbnail.png']
  }
}
// 이렇게 하면 자동으로 인덱스 페이지의 메타 데이터로 설정됨 -> 약속된 이름의 변수로 선언한거고 이걸로 export 해줘야함
// images 에서 / 이거는 정적 파일일 때 public 디렉토리를 가르킴


export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<BookListSkeleton count={3} />}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<BookListSkeleton count={10} />}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
