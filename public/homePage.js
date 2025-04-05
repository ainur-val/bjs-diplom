const logoutButton = new LogoutButton();

logoutButton.action = function() {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    }); 
}


ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});


const ratesBoard = new RatesBoard();

    function getCurrentRates() {
        ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    }); 
}
getCurrentRates();
setInterval(getCurrentRates, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = function(data) {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Баланс пополнен");
        }
        else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

moneyManager.conversionMoneyCallback = function(data) {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Конвертация валюты выполнена успешно");
        }
        else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

moneyManager.sendMoneyCallback = function(data) {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(response.success, "Перевод валюты выполнен успешно");
        }
        else {
            moneyManager.setMessage(response.success, response.error);
        }
    });
}

const favoritesWidget = new FavoritesWidget();

    ApiConnector.getFavorites(response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    }); 

    favoritesWidget.addUserCallback = function(data) {
        ApiConnector.addUserToFavorites(data, response => {
            if (response.success) {
                favoritesWidget.clearTable();
                favoritesWidget.fillTable(response.data);
                favoritesWidget.updateUsersList(response.data);
                favoritesWidget.setMessage(response.success, "Пользователь добавлен в список избранных");
            }
            else {
                favoritesWidget.setMessage(response.success, response.error);
            }
        });
    }

    favoritesWidget.removeUserCallback = function(data) {
        ApiConnector.removeUserFromFavorites(data, response => {
            if (response.success) {
                favoritesWidget.clearTable();
                favoritesWidget.fillTable(response.data);
                favoritesWidget.updateUsersList(response.data);
                favoritesWidget.setMessage(response.success, "Пользователь удален из списка избранных");
            }
            else {
                favoritesWidget.setMessage(response.success, response.error);
            }
        });
    }







