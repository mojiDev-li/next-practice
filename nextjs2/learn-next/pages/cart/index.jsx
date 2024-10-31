// '/carts'에 해당하는 페이지 컴포넌트

import { fetchCarts } from '@/api';
import CartHeader from '@/components/cart/CartHeader';
import CartList from '@/components/cart/CartList';

function CartPage({ carts }) {
	return (
		<div>
			<CartHeader />
			<CartList carts={carts} />
		</div>
	);
}

export async function getServerSideProps() {
	const { data } = await fetchCarts();

	return {
		props: {
			carts: data,
		},
	};
}

export default CartPage;
