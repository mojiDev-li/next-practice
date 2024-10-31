"use client"
import { useRouter } from "next/navigation";
import { startTransition, useEffect } from "react"

// 어떤 환경이든 발생가능한 오류는 서버, 클라이언트 모두 대응 가능하도록 하려고 -> 클라이언트, 서버 둘다 실행되니까
// reset은 오류가 발생했을 때 다시 시도하도록 하는것임 -> 컴포넌트들을 다시 랜더링 -> 클라이언트 쪽에서 서버에서 받은 데이터를 가지고 다시 한번 렌더링 하는것임 -> 서버쪽에서 재실행하는것이 아님
// router.refresh() -> 현재 페이지에 필요한 서버컴포넌트들을 다시 불러옴, AllBooks나 RecoBooks 같은 -> 서버 컴포넌트만 리프레쉬
// router.refresh(); reset(); -> reset역할은 에러 상태를 초기화 하고 컴포넌트들을 재랜더링 -> router.refresh()로 새로고침해도 에러상태가 초기화 되지 않기 때문에 에러 상태를 초기화 해주는게 필요함
// rotuer.refresh() -> 비동기 함수여서 이 함수가 끝남을 보장하고 reset()을 호출해야함
export default function Error({ error, reset }: { error: Error; reset: () => void }) {

  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error])
  return (
    <div>
      <h3>검색 오류 발생했어요.</h3>
      <button onClick={() => {
        startTransition(() => { // 일괄적으로 동시에 처리시키는 함수임. router.refresh()의 동기적인걸 보장하도록 하는 것임
          router.refresh();
          reset();
        });
      }}>다시시도</button>
    </div >
  )
}