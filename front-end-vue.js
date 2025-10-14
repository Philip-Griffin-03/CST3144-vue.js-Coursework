
const app = Vue.createApp({
        data(){
            return {
                title: "After School App",
                showlesson: true,
                lesson: {
                    subject: "Maths",
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
            addlesson() {
                this.cart.push(this.lesson.id);
            },

            showcheckout() {
                this.showlesson = this.showlesson ? false:true;
            }



        },
        computed: {
            cartitemcount() {
                return this.cart.length || "";
            },

            cartempty() {
                return this.lesson.space > this.cartitemcount;
            },

            pricetotal() {
                return this.cart.length * this.lesson.price || 0;
            }
        }
    })

    app.mount("#app")
