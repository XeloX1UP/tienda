import type { ICartItem, Producto } from "./exports";


const CART_EVENT = "cart-updated";

export function getCart(): ICartItem[] {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch (_) {
    return [];
  }
}

export function setCart(cart: ICartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
  dispatchEvent(new CustomEvent(CART_EVENT, { detail: cart }));
}

export function addToCart(product: Producto, quantity: number, selectedSize: string) {
            
    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.productId === product.id && item.options?.size === selectedSize);
    if (existingItemIndex !== -1) {
        const newQuantity = cart[existingItemIndex].quantity + quantity;
        if (newQuantity > (product.stock || 0)) {
            alert('No hay suficiente stock disponible para la cantidad solicitada.');
            return false;
        }
        cart[existingItemIndex].quantity = newQuantity;
    } else {
        if (quantity > (product.stock || 0)) {
            alert('No hay suficiente stock disponible para la cantidad solicitada.');
            return false;
        }
        cart.push({ productId: product.id, quantity, options: { size: selectedSize } });
    }
    setCart(cart);
    return true
}
export function deleteCartItem (productId: number) {
  const cart = getCart()
  if (!cart.length) return
  setCart(cart.filter((item) => item.productId != productId))
}
export const CART_EVENT_NAME = CART_EVENT;