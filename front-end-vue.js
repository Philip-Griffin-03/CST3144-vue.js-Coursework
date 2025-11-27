

const api_base = "https://schoolstoresite-env.eba-gd5cp4rr.eu-north-1.elasticbeanstalk.com";


const app = Vue.createApp({
        data(){
            return {

                apibase: api_base,

                title: "After School App",
                showlesson: true,

                lessons: [],
                
                cart: [],
                username: "",
                userphone: "",
                picked: "Subject",
                sortDesc: false,
                search: "",
                isCheckingOut: false
                
            }
        },

//s

        created() {
            console.log("Backend api:", this.apibase);

            fetch(this.apibase + "/lessons")
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response was not ok: " + response.status);
                }
                return response.json();
            })
            .then(json => {
                console.log("Fetched lessons:", json);
                this.lessons = json;
            })
            .catch(error => {
                console.error("Failed to load lessons from backend:", error);
            });

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
            },

            showcheckout() {//changes boolean value of showlesson to change the page from the shop page to the checkout page
                this.showlesson = !this.showlesson;
            },

            removelesson(lesson) {//removes the lesson selected by the user from their cart, only 1 quantity removed and a space added back onto the database (to be added for backend) / doesnt have to be added to database as only after checkout is a push made
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

            async checkout() {


                if (this.isCheckingOut) {
                    console.log("Check in progress, ignore extra clicks");
                    return;
                }

                this.isCheckingOut = true;
                console.log("checkout started");
                
                try {
                    const orderCart = this.cart.map(item => ({
                        id: item.id,
                        subject: item.subject,
                        location: item.location,
                        price: item.price,
                        quantity: item.quantity
                    }));

                    const order = {
                        username: this.username,
                        userphone: this.userphone,
                        cart: orderCart,
                        total: this.pricetotal
                    };

                    const orderRes = await fetch(this.apibase + "/checkout", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(order)
                    });

                    if (!orderRes.ok) {
                        throw new Error("Checkout failed with status " + orderRes.status);
                    }

                    const data = await orderRes.json();
                    console.log("Order Saved:", data);

                    const updatePromises = this.cart.map(item => {
                        return fetch(this.apibase + "/lessons/" + item.id, {
                            method: "PUT",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ quantity: item.quantity })
                        }).catch(err => {
                            console.error("Update failed for lesson", item.id, err);
                        });
                });

                await Promise.all(updatePromises);

                alert("Order Confirmed " + this.username);

                this.username = "";
                this.userphone = "";
                this.cart = [];

            } catch (err) {
                console.error("Error during checkout:", err);
                alert("Failed to complete checkout");
            } finally {
                this.isCheckingOut = false;
                console.log("Checkout Complete")
            }
        
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

                let sorted = [...this.lessons];

                if (this.search.trim() !== "") {
                    const query = this.search.toLowerCase();

                    sorted = sorted.filter(lesson => {
                        return (
                            lesson.subject.toLowerCase().includes(query) ||
                            lesson.location.toLowerCase().includes(query) ||
                            lesson.price.toString().includes(query) ||
                            lesson.space.toString().includes(query)
                        );
                    });
                }



                switch(this.picked) {//uses switch to check sort feature selected and sorts array of lessons via which attribute is selected
                    
                    case "Subject":
                        sorted.sort((a,b) => a.subject.localeCompare(b.subject));
                        break;
                    case "Location":
                        sorted.sort((a,b) => a.location.localeCompare(b.location));
                        break;
                    case "Price":
                        sorted.sort((a,b) => a.price - b.price);
                        break;
                    case "Space":
                        sorted.sort((a,b) => a.space - b.space);
                        break;
                }

                if (this.sortDesc) sorted.reverse();

                return sorted;


                
            }


        }
    })

    app.mount("#app")
