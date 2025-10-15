
const app = Vue.createApp({
        data(){
            return {
                title: "After School App",
                showlesson: true,
                lessons: [{//temp data, this will be an array fetched from the database
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
                userphone: "",
                picked: "Subject"
                
            }
        },
        methods: {
            addlesson(lesson) {//adds the lesson added by the user, pushes it onto their cart with quantity of 1 if the lesson isnt already added or quantity added to the current lesson in their cart

                console.log(this.picked);//delete after, used to see which sort is picked
                const existing = this.cart.find(item => item.id === lesson.id);//checks if selected lesson is in cart
                            
                if (existing) {//if same lesson with same id is already in cart then only the quantity of that lesson will be increased
                    existing.quantity++;
                }
                else {//if not then the whole of the lesson data is pushed onto cart along with a quantity value of 1
                    this.cart.push({...lesson, quantity: 1});
                }

                lesson.space--;
                this.sort();
            },

            showcheckout() {//changes boolean value of showlesson to change the page from the shop page to the checkout page
                this.showlesson = !this.showlesson;
            },

            removelesson(lesson) {//removes the lesson selected by the user from their cart, only 1 quantity removed and a space added back onto the database (to be added for backend)
                const existing = this.cart.find(item => item.id === lesson.id);//checks if selected lesson is in cart

                if(existing) {//if lesson with same id as lesson selected is in the cart then it will decrease the quantity from cart 
                    existing.quantity--;
                    this.lessons.find(item => item.id === lesson.id).space++;//this will find the correct lesson in the array of lessons via the same id and add 1 to space
                    
                    if(existing.quantity <= 0) {//checks if the value of the quantity in the cart of the selected lesson is 0 or below, if so the filter will get only select 
                                                //the lessons that don't share the same id as a way to remove the selected lesson as that lesson has 0 quantity in the updated cart
                        this.cart = this.cart.filter(item => item.id !== lesson.id);
                    }
                }
            },
            checkout() {
                //placeholder for function to push order onto database
                alert("Order Confirmed " + this.username);
                this.username = "";
                this.userphone = "";
                this.cart = [];
            }



        },
        computed: {
            cartitemcount() {//returns length of cart for cart button 
                return this.cart.length || "";
            },

            pricetotal() {//adds up total amount of lessons in the users cart with the quantity of each lesson
            return this.cart.reduce((total, lesson) => total + lesson.price * lesson.quantity, 0);
            },

            infocheck() {//this checks if the name only had letters and the phone number only has numbers entered by the user
                if ((this.username.trim() == "" || (/[^a-zA-Z]/.test(this.username.trim()))) || this.userphone.trim() == "" || (/[^0-9]/.test(this.userphone.trim()))){// add this to have phone number length minimum|| this.userphone.trim().length <= 9
                    return true; 
                }  
            },

            sort() {//uses this.picked to change which sort is used, the picked is used to order the cart according to picked selected
                if (this.picked == "Subject" || this.picked == "Location") {
                    this.cart.subject.sort();
                }
                else if (this.picked == "Price" || this.picked == "Space") {
                    this.cart.price.sort(function(a, b){return a-b});
                }
                return true;
            }


        }
    })

    app.mount("#app")
