
const app = Vue.createApp({
        data(){
            return {
                title: "After School App",
                showlesson: true,
                lessons: [{
                    id:1001,
                    subject: "Maths",
                    location: "London",
                    price: 20,
                    space: 5,
                    imagepath: "images/maths.png",
                    altimagetext: "Maths Icon",
                },
                {
                    id:1001,
                    subject: "Maths",
                    location: "Manchester",
                    price: 10,
                    space: 5,
                    imagepath: "images/maths.png",
                    altimagetext: "Maths Icon",
                },
                {
                    id:1001,
                    subject: "English",
                    location: "London",
                    price: 30,
                    space: 5,
                    imagepath: "images/english.png",
                    altimagetext: "English Icon",
                },
                {
                    id:1001,
                    subject: "English",
                    location: "Bristol",
                    price: 20,
                    space: 5,
                    imagepath: "images/english.png",
                    altimagetext: "English Icon",
                },
                {
                    id:1001,
                    subject: "Science",
                    location: "London",
                    price: 30,
                    space: 5,
                    imagepath: "images/science.png",
                    altimagetext: "Science Icon",
                },
                {
                    id:1001,
                    subject: "Science",
                    location: "Manchester",
                    price: 120,
                    space: 5,
                    imagepath: "images/science.png",
                    altimagetext: "Science Icon",
                },
                {
                    id:1001,
                    subject: "Music",
                    location: "London",
                    price: 50,
                    space: 5,
                    imagepath: "images/music.png",
                    altimagetext: "Music Icon",
                },
                {
                    id:1001,
                    subject: "Music",
                    location: "Bristol",
                    price: 40,
                    space: 5,
                    imagepath: "images/music.png",
                    altimagetext: "Music Icon",
                },
                {
                    id:1001,
                    subject: "Art",
                    location: "London",
                    price: 40,
                    space: 5,
                    imagepath: "images/art.png",
                    altimagetext: "Art Icon",
                },
                {
                    id:1001,
                    subject: "Art",
                    location: "Manchester",
                    price: 30,
                    space: 5,
                    imagepath: "images/art.png",
                    altimagetext: "Art Icon",
                },
            
            
            ],
                cart: []
                
            }
        },
        methods: {
            addlesson(lesson) {
                if (lesson.space > 0) {
                    this.cart.push(lesson.id);
                    this.lesson.space = this.lesson.space - 1;
                }
            },

            showcheckout() {
                this.showlesson = !this.showlesson;
            }



        },
        computed: {
            cartitemcount() {
                return this.cart.length || "";
            },

            spaceempty() {
                return this.lesson.space != 0;
            },

            pricetotal() {
                return this.cart.length * this.lesson.price || 0;
            }
        }
    })

    app.mount("#app")
