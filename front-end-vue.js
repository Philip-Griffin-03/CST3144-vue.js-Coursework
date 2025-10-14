
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
                    id:1002,
                    subject: "Maths",
                    location: "Manchester",
                    price: 10,
                    space: 5,
                    imagepath: "images/maths.png",
                    altimagetext: "Maths Icon",
                },
                {
                    id:1003,
                    subject: "English",
                    location: "London",
                    price: 30,
                    space: 5,
                    imagepath: "images/english.png",
                    altimagetext: "English Icon",
                },
                {
                    id:1004,
                    subject: "English",
                    location: "Bristol",
                    price: 20,
                    space: 5,
                    imagepath: "images/english.png",
                    altimagetext: "English Icon",
                },
                {
                    id:1005,
                    subject: "Science",
                    location: "London",
                    price: 30,
                    space: 5,
                    imagepath: "images/science.png",
                    altimagetext: "Science Icon",
                },
                {
                    id:1006,
                    subject: "Science",
                    location: "Manchester",
                    price: 20,
                    space: 5,
                    imagepath: "images/science.png",
                    altimagetext: "Science Icon",
                },
                {
                    id:1007,
                    subject: "Music",
                    location: "London",
                    price: 50,
                    space: 5,
                    imagepath: "images/music.png",
                    altimagetext: "Music Icon",
                },
                {
                    id:1008,
                    subject: "Music",
                    location: "Bristol",
                    price: 40,
                    space: 5,
                    imagepath: "images/music.png",
                    altimagetext: "Music Icon",
                },
                {
                    id:1009,
                    subject: "Art",
                    location: "London",
                    price: 40,
                    space: 5,
                    imagepath: "images/art.png",
                    altimagetext: "Art Icon",
                },
                {
                    id:1010,
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
                    this.cart.push(lesson);
                    lesson.space = lesson.space - 1;
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

            pricetotal() {
                return this.cart.reduce((total, lesson) => total + lesson.price, 0);
            }
        }
    })

    app.mount("#app")
