const { createApp } = Vue

createApp({
    data() {
        return {
            arrayTarjetas: [],
            precioMenor: [],
            precioMayor: [],
            arrayAnimal: [],
            checkAnimal: "",
            active: false,
            isScrolled: false,
        }
    },
    created() {      //api
        fetch('https://mindhub-xj03.onrender.com/api/petshop')
            .then(respuesta => respuesta.json())
            .then(datosPetShop => {
                this.arrayTarjetas = datosPetShop.filter(producto => producto.categoria == "jugueteria")

                /*this.menor = this.arrayTarjetas.filter(juguete => juguete.precio > this.precioMenor)*/
                /*this.arrayCategorias = [... new Set(this.pastEvents.map(evento => evento.category))]*/
            })
            .catch(error => console.log(error))
    },
    mounted() {
        window.addEventListener("scroll", this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener("scroll", this.onScroll);
    },
    methods: {
        filtroAnimal() {
            this.arrayAnimal = this.arrayTarjetas.filter(producto => producto.descripcion = this.checkAnimal.toString())
            this.arrayTarjetas = this.arrayAnimal
            console.log(this.arrayTarjetas)
        },
        filtroPrecioMayor() {
            this.precioMayor = this.arrayTarjetas.sort((a, b) => b.precio - a.precio)
            console.log(this.precioMayor)
            this.arrayTarjetas = this.precioMayor
        },
        filtroPrecioMenor() {
            this.precioMenor = this.arrayTarjetas.sort((a, b) => a.precio - b.precio)
            console.log(this.precioMenor)
            this.arrayTarjetas = this.precioMenor
        }, toggleActive() {
            this.active = !this.active
        },
        onScroll() {
            this.isScrolled = window.scrollY > 0;
        }
        /*filtrosCruzados(){                    
            this.arrayFiltrosCruzados = this.arrayTarjetas.filter(juguete => {
                return juguete.producto.toLowerCase().includes(this.inputSearch.toLowerCase()) && (this.arrayCheckBox.includes(juguete.categoria) || this.arrayCheckBox.length == 0)
            })
        }*/
    }
}).mount("#app")