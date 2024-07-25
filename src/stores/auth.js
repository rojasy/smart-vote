import { defineStore } from "pinia";
import axios from 'axios';
import qs from 'qs';
import {apolloClient} from "../apollo-client";
import {GET_LOGGED_USER} from "../graphql/auth-graphql"
// import {useToast} from 'vuestic-ui';

// const {init} = useToast()

export const useAuthStore = defineStore('authStore',{
    state: ()=>({
        token: "",
        user: 'Rojasy',
        users:[],
        loggedUser: {}
    }),

    actions:{

           // Setter
           setToken(newValue) {
            this.token = newValue;
        },

        setUserDetails(newValue) {
            this.loggedUser = newValue;
        },

        // Getter
        getToken() {
            return this.token;
        },

        getUserDetails() {
            return this.loggedUser;
        },

        async login(formData) {
            try {
                const response = await axios.post(
                    import.meta.env.VITE_APP_BACKEND_URL + "/auth/login",
                    qs.stringify({
                username: formData.username,
                password: formData.password,
            }),
                    {
                        headers: {
                            Accept: "application/json",
                            "Content-Type": "application/x-www-form-urlencoded",
                        }
                    }
                );

                if (response.data.code === 9000) {
                    // Save the token to the store
                    this.setToken(response.data.data.token);
                    localStorage.setItem("token", JSON.stringify(response.data.data.token));
                    // this.token =response.data.data.token;
                    await this.GetLoggedInUser();
                    this.router.push({name: 'home'})


                    // init({message: response.data.message, color: 'success'});

                } else {
                    init({message: response.data.message, color: 'warning'});
                }
            } catch (error) {
                // console.error("An error occurred:", error);
                console.log(error)
                // Handle error here, e.g., display a toast message to the user
            }
        },

        async GetLoggedInUser() {
            await apolloClient
                .query({
                    fetchPolicy: "network-only",
                    query: GET_LOGGED_USER,
                    variables: {},
                })
                .then((res) => {
                    if (res.data.getLoggedInUser.code == 9000) {
                        // const permissions = [];
                        let data = res.data.getLoggedInUser;
                        
                        // Object.assign(this.loggedUser, data);

                        console.log("HERE")
                        console.log(data)
                        console.log(res.data.getLoggedInUser.data)

                        this.loggedUser = {...data.data};

                        console.log(data)
                        console.log(this.loggedUser)
                    } else {
                        // init({message: res.data.getLoggedInUser.message, color: 'warning'});
                        console.log("ELSE ELSE")
                    }
                    return res;
                })
                .catch((err) => {
                    console.log(err);
                    return err;
                });
        },



        // async resetPassword(oldpassword, confirmpassword) {
        //     try {
        //         const passwordDto = {
        //             oldPassword: oldpassword,
        //             newPassword: confirmpassword
        //         };

        //         const response = await apolloClient.mutate({
        //             mutation: CHANGE_PASSWORD,
        //             variables: {
        //                 passwordDto
        //             },
        //         });

        //         const output = response.data.changePassword;

        //         if (output.code == 5000) {
        //             init({message: output.message, color: 'success'});
        //             router.push({name: 'dashboard'});
        //         } else {
        //             init({message: output.message, color: 'warning'});

        //         }
        //     } catch (error) {
        //         // Handle any errors here
        //         console.error("Error resetting password:", error);
        //         throw error; // Rethrow the error to handle it in the caller
        //     }
        // },

        // Get User
        async getAllUser(){
            const res = await fetch("/api/user/",{
                method:"get",
            });

            const data = await res.json();
            if(res.ok){
                this.users = data.users;
                console.log(data)
            }
            // console.log(data)
        },

        // Login user
        // async login(formData){
        //     const res = await fetch("/api/user/login",{
        //         method:"post",
        //         body:JSON.stringify(formData),
        //     });

        //     console.log(res.body)

        //     const data = await res.json();
        //     if(data.error){
        //         console.log(data.error)
        //     }
        //     console.log(data);
        //     this.user = data.username
        //     this.router.push({name: 'home'})

        // },




        // Register User
        async signup(formData){
            const res = await fetch("/api/user/signup",{
                method:"post",
                body:JSON.stringify(formData),
            });

            console.log(res.body)

            const data = await res.json();
            if(data.error){
                console.log(data.error)
            }
            console.log(data);
            this.router.push({name: 'home'})

        }
    }
})