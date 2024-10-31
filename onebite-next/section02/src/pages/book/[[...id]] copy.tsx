// book뒤에 id가 여러번 올때 사용됨
// catch all segmant 라고 부름
// 이때 여러번 온 id 값의 경우 배열에 담아짐
// 이때 /book만 url로 요청할 경우 잡지 못함 -> 404 발생
// /book 이라고 요청해도 응답 가능한 페이지 ->[[...idx]].tsx
import { useRouter } from "next/router"

export default function Page(){
    const router = useRouter();
    const {id} = router.query
    return <h1>...id book {id}</h1>
}