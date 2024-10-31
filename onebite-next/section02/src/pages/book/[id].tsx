// import { GetServerSidePropsContext, GetStaticPropsContext, InferGetServerSidePropsType, InferGetStaticPropsType } from 'next';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next';
import style from './[id].module.css'
import fetchOneBook from '@/lib/fetch-one-book';
import { useRouter } from 'next/router';
import Head from 'next/head';
// import { notFound } from 'next/navigation';

// SSG 방식으로 동작 -> /book 뒤에 여러개의 경로가 존재함 -> 파라미터로 전달되는 다른 값
// 빌드 타임때 사용하려면 -> 경로를 설정하는 부분이 선수행 되어야함.
// 여기서는 ID를 백엔드서버에서 미리 받아온다던지 해야함. -> id 1, 2, 3 이런걸 몇개 알려줌.

// 이렇게 뒤에 경로에 파라미터가 온다라는걸 명시적으로 알려줘야하며
// 값은 무조건 다 문자열로 정의해야함
// fallback은 우리가 알려준 파라미터 이외 값이 올 때 처리해야하는걸 정의함
export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } }
    ],
    // fallback: false, // 이건 묻지도 따지지도 않고 1,2,3이 아니면 404로 보냄
    // fallback: "blocking" // 이건 1, 2, 3 이 아니면 서버 사이드 렌더링 처럼 즉시 생성함. 이렇게 하면 next서버에 만들어놓기 때문에 ssg처럼 빠르게 보여줌, 존재하지 않은 페이지를 생성할 떄, 사전렌더링 시간이 길어지면 로딩이 길어지는거임 -> 페이지 크기에 따라서 오랜 시간을 기다리게 됨 -> fallback true로 해결 가능
    fallback: true // Props 없는 페이지로 바로 반환함(getSataticProps로 부터 받은 데이터가 없는 페이지). 백엔드 서버에서 데이터를 받아오는 과정을 생략하고 바로 사전렌더링 해서 반환함. 이후 props 계산해서 props만 따로 반환
  }
}
export const getStaticProps = async (context: GetStaticPropsContext) => {

  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));


  if (!book) { // fallback이 true여서 데이터자체가 존재하지 않아도 로딩이되는데 해당 조건문으로 바로 404로 처리하는거임
    return {
      notFound: true
    }
  }

  return {
    props: {
      book
    }
  }
}

export default function Page({ book }: InferGetStaticPropsType<typeof getStaticProps>) {

  const router = useRouter();
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>한입북스 - 검색결과</title>
          <meta property="og:image" content="/thumbnail.png" />
          <meta property="og:title" content="한입북스" />
          <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
        </Head>
        <div>로딩중입니다</div>
      </>
    );
  } // fallback 상태인데 데이터를 나중에 받았을 때 페이지를 정상처리 하기 위함

  if (!book) return "문제가 발생했습니다. 다시 시도하세요."; // fallback 상태 -> 데이터를 받지 못한 상태

  const {
    // id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl
  } = book
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.conatiner}>
        <div className={style.cover_img_container} style={{ backgroundImage: `url('${coverImgUrl}')` }}>
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>
          {title}
        </div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>

        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}