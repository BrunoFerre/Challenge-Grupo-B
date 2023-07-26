
const { createApp } = Vue
const options = {
    data() {
        return {
            active: false,
            isScrolled: false,
            arrayJugueteria:[],
            categorias:[],
            filtroMayor:[],
            filtroMenor:[],
            aleatorio:[],       
            arrayNormal:[],
            arrayCruzado:[],
            catAnimal:[],
            arrayPerro:[],
        }
    },
    created(){
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
        .then(respuesta => respuesta.json())
        .then(datosApi =>{
           this.arrayJugueteria = datosApi.filter(producto => producto.categoria == 'jugueteria')
           console.log(this.arrayJugueteria);
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
            this.filtroMenor = this.arrayCruzado.sort((a,b) => a.precio - b.precio)
            this.arrayCruzado = this.filtroMenor
           console.log(this.productosStockbajo);

        },
        filtroPrecioMayor(){
            this.filtroMayor = this.arrayCruzado.sort((a,b) => b.precio - a.precio)
            this.arrayCruzado = this.filtroMayor
           console.log(this.productosStockbajo);

        },
        filtroAl(){
           this.arrayCruzado= this.productosStockbajo
    },
    },
    computed:{
        cruzado(){
            this.arrayCruzado = this.arrayJugueteria.filter(producto => { 
                return producto.producto.toLowerCase().includes( this.catAnimal )})
            }
    }
}
const app = createApp(options);
app.mount('#app');
