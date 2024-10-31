import { fetchProductsDetail } from '@/api';
import ProductHeader from '@/components/ProductHeader';
import ProductInfo from '@/components/product-detail/ProductInfo';

export default function ProductDetailPage({ productDetail }) {
	const headerTitle = '상품 상세 정보 페이지';

	return (
		<div>
			<ProductHeader title={headerTitle} />
			<ProductInfo productDetail={productDetail} />
		</div>
	);
}

export async function getServerSideProps(context) {
	console.log(context.params.id);

	const id = context.params.id;
	const { data } = await fetchProductsDetail(id);

	return {
		props: { productDetail: data },
	};
}
