<template>
    <div class="modal fade" id="addPerson" tabindex="-1" role="dialog" aria-labelledby="addPersonTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Add a new person</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div>
                    <div class="modal-body">
                            <div class="form-group">
                                <label for="idInput">ID</label>
                                <input type="number" required v-model="id" class="form-control" id="idInput" placeholder="Enter id">
                            </div>
                            <div class="form-group">
                                <label for="firstNameInput">First Name</label>
                                <input type="text" required v-model="firstName" class="form-control" id="firstNameInput" placeholder="First Name">
                            </div>
                            <div class="form-group">
                                <label for="lastNameInput">Last Name</label>
                                <input type="text" required v-model="lastName" class="form-control" id="lastNameInput" placeholder="Last Name">
                            </div>
                            <div class="form-group">
                                <label for="emailInput">Email</label>
                                <input type="email" required v-model="email" class="form-control" id="emailInput" placeholder="Email">
                            </div>
                            <div class="form-group">
                                <label for="phoneInput">Phone</label>
                                <input type="tel" required v-model="phone" class="form-control" id="phoneInput" placeholder="Phone">
                            </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <!-- <button type="submit" @click="post('api/small-table', postObj)" class="btn btn-primary">Add person</button> -->
                        <button type="submit" @click="postPerson()" class="btn btn-primary">Add person</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// ********************************************************************************************************
// Всё, что закомментировано в данном компоненте - это функционал добавления пользователя в БД через сервер.
// Так как нам нужна база данных без тестовых людей, то функционал упрощён
// ********************************************************************************************************
export default {
    data() {
        return {
            id: 0,
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
        }
    },
    methods: {
        postPerson() {
            this.$parent.database.unshift(
                {
                    "id": this.id,
                    "firstName": this.firstName,
                    "lastName": this.lastName,
                    "email": this.email,
                    "phone": this.phone,
                    "address": {
                        "streetAddress": "street_adress",
                        "city": "city",
                        "state": "state",
                        "zip": "zip"
                    },
                    "description": "ipsum et magna nullam odio nec fringilla dolor mattis placerat mattis aliquam quis eget sed lacus at consectetur pretium odio ipsum fringilla egestas aliquam tempor ipsum placerat odio morbi mi morbi placerat"
                }
            )
        },
        // post(url, obj) {
        //     this.postPerson()
            
        //     return fetch(url, {
        //         method: 'POST',
        //         headers: {
        //             "Content-type": "application/json"
        //             },
        //         body: JSON.stringify(obj)
        //     })
        // }
    },
    // computed: {
    //     postObj() {
    //         return  {
    //                     "id": this.id,
    //                     "firstName": this.firstName,
    //                     "lastName": this.lastName,
    //                     "email": this.email,
    //                     "phone": this.phone,
    //                     "address": {
    //                         "streetAddress": "street_adress",
    //                         "city": "city",
    //                         "state": "state",
    //                         "zip": "zip"
    //                     },
    //                     "description": "ipsum et magna nullam odio nec fringilla dolor mattis placerat mattis aliquam quis eget sed lacus at consectetur pretium odio ipsum fringilla egestas aliquam tempor ipsum placerat odio morbi mi morbi placerat"
    //                 }
    //     }
    // }
}
</script>