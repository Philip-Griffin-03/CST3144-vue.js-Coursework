
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
                cart: [],
                username: "",
                userphone: ""
                
            }
        },
        methods: {
            addlesson(lesson) {

                const existing = this.cart.find(item => item.id === lesson.id);
                            
                if (existing) {
                    existing.quantity++;
                }
                else {
                    this.cart.push({...lesson, quantity: 1});
                }

                lesson.space--;
            },

            showcheckout() {
                this.showlesson = !this.showlesson;
            },

            removelesson(lesson) {
                const existing = this.cart.find(item => item.id === lesson.id);

                if(existing) {
                    existing.quantity--;
                    this.lessons.find(item => item.id === lesson.id).space++;
                    
                    if(existing.quantity <= 0) {
                        this.cart = this.cart.filter(item => item.id !== lesson.id);
                    }
                }
            }



        },
        computed: {
            cartitemcount() {
                return this.cart.length || "";
            },

            pricetotal() {
            return this.cart.reduce((total, lesson) => total + lesson.price * lesson.quantity, 0);
            },

            infocheck() {
                if (this.username.trim() == "" || this.userphone.trim() == ""){
                    return true;
                }
                
                
                
            }
        }
    })

    app.mount("#app")
