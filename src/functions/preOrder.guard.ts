import { navigate } from "astro:transitions/client";
import { getCart } from "../assets/cartStore";
function init () {
    const cart = getCart()
    if (!cart || !cart.length) navigate('/', {
        history: 'replace'
    })

}
console.log('ejecutando guard');
document.addEventListener('astro:page-load', () => {
    const path = '/preOrder'
    if (!(location.pathname == path)) return
    init()
    
})

init()