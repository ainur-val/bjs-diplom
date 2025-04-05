"use strict";

const useForm = new UserForm();

useForm.loginFormCallback = function(data) {
    ApiConnector.login(data, response => {
        if (!response.success) {
            userForm.setLoginErrorMessage(response.error);
        } else {
            location.reload();
        }
    });
}

useForm.registerFormCallback = function(data) {
    ApiConnector.register(data, response => {
        if(!response.success) {
            userForm.setRegisterErrorMessage(response.error);
        } else {
            location.reload();
        }
    });
}

