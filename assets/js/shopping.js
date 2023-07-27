
const { createApp } = Vue
const options = {
    data() {
        return {
            active: false,
            isScrolled: false,
            carrito:[],
            carrito2:[]
        }
    },
    created(){
        this.carrito = JSON.parse(localStorage.getItem('carrito')) ?? []
        console.log(this.carrito);
    },
    methods: {
        toggleActive() {
            this.active = !this.active
        },
        onScroll() {
            this.isScrolled = window.scrollY > 0;
        },
    mounted() {
        window.addEventListener("scroll", this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll);
    },
    borrarcarrito(id) {
        localStorage.removeItem('carrito',id)
        const indexProducto = this.carrito.findIndex(producto=> producto._id == id)
        if (indexProducto != -1) {
            const productoEncotrado = this.carrito.splice(indexProducto,1)
        }
    },
}
}
const app = createApp(options);
app.mount('#app');
