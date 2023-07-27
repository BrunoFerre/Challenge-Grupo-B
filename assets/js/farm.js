
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
            productosStockbajo:[],
            arrayNormal:[],
            arrayCruzado:[],
            catAnimal:[],
            carrito:[]
        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
        .then(respuesta => respuesta.json())
        .then(datosApi =>{
           this.arrayFarmacia = datosApi.filter(producto => producto.categoria == 'farmacia')
           this.productosStockbajo = this.arrayFarmacia.filter(producto=> producto.disponibles <=5 )
        })
    },
    methods: {
        toggleActive() {
            this.active = !this.active
        },
        onScroll() {
            this.isScrolled = window.scrollY > 0;
        },
        filtroPrecioMenor(){
            this.filtroMenor = this.arrayCruzado.sort((a,b) => a.precio - b.precio)
            this.arrayCruzado = this.filtroMenor
        },
        filtroPrecioMayor(){
            this.filtroMayor = this.arrayCruzado.sort((a,b) => b.precio - a.precio)
            this.arrayCruzado = this.filtroMayor
        },
        filtroAl(){
           this.arrayCruzado= this.productosStockbajo
    },
    local(producto,accion){
        if (accion == 'agregar' ) {
            this.carrito.push(producto)
            }else{
                this.carrito.filter(carr=> carr._id != producto._id)
            }
        localStorage.setItem('carrito', JSON.stringify(this.carrito))
    }
    },
    mounted() {
        window.addEventListener("scroll", this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll);
    },
    computed:{
        cruzado(){
            this.arrayCruzado = this.productosStockbajo.filter(producto => { 
                return producto.producto.toLowerCase().includes( this.catAnimal ) })
            }
    }
}
const app = createApp(options);
app.mount('#app');
