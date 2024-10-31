import SearchableLayout from "@/components/searchable-layout"
import { useRouter } from "next/router"
import { ReactNode } from "react"

export default function Page() {

    const router = useRouter()
    const { q } = router.query // 쿼리 스트링으로 넘긴 값을 구조분해 할당
    return <h1>search {q}</h1>
}

Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}