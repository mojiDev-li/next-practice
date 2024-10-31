import ProductHeader from '@/components/ProductHeader';
import ProductList from '@/components/product-list/ProductList';

// '/'에 해당하는 페이지 컴포넌트
function ProductPage() {
	const headerTitle = '상품 목록 페이지';

	return (
		<div>
			<ProductHeader title={headerTitle} />
			<ProductList />
		</div>
	);
}

// ProductHeader 컴포넌트까지 그렸기 때문에 여기는 서버 사이드 렌더링을 한 것임
// ProductList는 useEffect의 리액트 훅 때문에 클라이언트 사이드 렌더링을 한 것임

export default ProductPage;
