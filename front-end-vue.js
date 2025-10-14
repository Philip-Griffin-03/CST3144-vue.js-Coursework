
const app = Vue.createApp({
        data(){
            return {
                title: "After School App",
                showproduct: true,
                product: {
                    id:1001,
                    topic: "Maths",
                    location: "London",
                    price: 15,
                    space: 5,
                    imagepath: "images/maths.png",
                    altimagetext: "Maths Icon",
                },
                cart: []
                
            }
        },
        methods: {
            addproduct() {
                this.cart.push(this.product.id);
            },

            showcheckout() {
                this.showproduct = this.showproduct ? false:true;
            }



        },
        computed: {
            cartitemcount() {
                return this.cart.length || "";
            },

            cartempty() {
                return this.product.stock > this.cartitemcount;
            },

            pricetotal() {
                return this.cart.length * this.product.price || 0;
            }
        }
    })

    app.mount("#app")
