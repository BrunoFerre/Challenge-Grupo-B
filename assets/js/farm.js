
const { createApp } = Vue
const options = {
    data() {
        return {
            active: false,
            isScrolled: false,
            arrayFarmacia:[],
            categorias:[],
            filtroMayor:[],
            filtroMenor:[],
            aleatorio:[],
            productosStockbajo:[]
        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
        .then(respuesta => respuesta.json())
        .then(datosApi =>{
           this.arrayFarmacia = datosApi.filter(producto => producto.categoria == 'farmacia')
           console.log(this.arrayFarmacia);
           this.productosStockbajo = this.arrayFarmacia.filter(producto=> producto.disponibles <=5 )
           console.log(this.productosStockbajo)
        })
    },
    mounted() {
        window.addEventListener("scroll", this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll);
    },
    methods: {
        toggleActive() {
            this.active = !this.active
        },
        onScroll() {
            this.isScrolled = window.scrollY > 0;
        },
        filtroPrecioMenor(){
            this.filtroMenor = this.productosStockbajo.sort((a,b) => a.precio - b.precio)
            this.productosStockbajo = this.filtroMenor
        },
        filtroPrecioMayor(){
            this.filtroMayor = this.productosStockbajo.sort((a,b) => b.precio - a.precio)
            this.productosStockbajo = this.filtroMayor
        },
    },
}
const app = createApp(options);
app.mount('#app');