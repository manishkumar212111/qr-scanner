const translate_po = {
    "view cart" : "Zobacz Koszyk",
    "items in cart" : "przedmioty w koszyku",
    "Table" : "Stół",
    "MENU": "Menu",
    "ADD" : "Dodaj",
    "Calorie": "Kaloria",
    "Select Upto": "Wybierz do",
    "extra add ons" : "dodatkowe dodatki",
    "ADD ITEM" : "Plus",
    "Total" : "Suma",
    "Order": "Zamówienie",
    "Required": "Wymagany",
    "Optional":"Opcjonalny",
    "Creating order, Please wait": "Tworzę zamówienie, proszę czekać",
    "Order on the way": "Zamów w drodze",
    "We have start preparing your order, it will be served you soon" : "Rozpoczęliśmy przygotowywanie Twojego zamówienia, wkrótce zostanie Ci doręczone",
    "Order Number": "Numer zamówienia",
    "Missed Something ?": "czegoś brakuje?",
    "Order More": "Zamów więcej",
    "Your Cart" : "twój koszyk",
    "Your cart is empty" : "Twój koszyk jest pusty",
    "payments" : "Płatności",
    "Payment method" : "Metody płatności",
    "Pay Cash" : "Gotówka",
    "Pay Via Card": "Karta",
    "MADA" : "MADA",
    "Great we will accept your payment after serving you." : "Proszę zaakceptujemy twoją płatność po podaniu ci.",
    "use this card" : "Użyj tej karty",
    "Select" : "Wybierz",
    "Payment Option": "Opcja płatności",
    "Cash" : "Karta",
    "Mada" : "Mada",
    "Order Instructions": "zamówienie instrukcje",
    "Ex - Do not put bell pepper in pizza, serve beer chilled": "Np. - Nie wkładaj papryki do pizzy, podawaj piwo schłodzone",
    "Order Serve At": "Zamów podawaj w",
    "Take Away" : "Dostawa",
    "Item Total": "Razem",
    "Sales Tax": "podatki",
    "Place Order" : "Złożyć zamówienie"

}


const translate_ru = {
    "view cart" : "  просмотреть корзину ",
    "items in cart" : " просмотреть корзину",
    "Table" : " Стол",
    "MENU": " МЕНЮ",
    "ADD" : "ДОБАВИТЬ ",
    "Calorie": " Калорийность",
    "Select Upto": "Выберите ",
    "extra add ons" : "дополнить ",
    "ADD ITEM" : " добавить предметы",
    "Total" : "общий ",
    "Order": "заказать ",
    "Required": "Необходимый ",
    "Optional":"По желанию ",
    "Creating order, Please wait": "Создание заказа, пожалуйста, подождите ",
    "Order on the way": " Заказ в пути",
    "We have start preparing your order, it will be served you soon" : "Мы начали готовить ваш заказ, скоро вы его получите",
    "Order Number": "Номер заказа ",
    "Missed Something ?": "Что-то пропустил ?",
    "Order More": "Заказать больше ",
    "Your Cart" : "Ваша корзина ",
    "Your cart is empty" : "Ваша корзина пуста ",
    "payments" : "выплаты ",
    "Payment method" : "Способ оплаты ",
    "Pay Cash" : "заплатить наличными ",
    "Pay Via Card": "заплатить картой",
    "MADA" : "",
    "Great we will accept your payment after serving you." : " Мы примем ваш платеж после обслуживания.",
    "use this card" : "использовать эту карту",
    "Select" : " Выбирать",
    "Payment Option": " Вариант оплаты",
    "Cash" : "Наличные ",
    "Mada" : " ",
    "Order Instructions": "Инструкции по заказу ",
    "Ex - Do not put bell pepper in pizza, serve beer chilled": "Пример - Не кладите болгарский перец в пиццу, подавайте пиво охлажденным. ",
    "Order Serve At": " Заказать подавать в",
    "Take Away" : " Забрать",
    "Item Total": "Итого по позиции ",
    "Sales Tax": " Налог с продаж",
    "Place Order" : "  Разместить заказ "

}

const t = (str) => {
    let lang = localStorage.getItem("language") || "en";
    switch(lang){
        case "po":
            return translate_po[str] || str;
            
        case "ru":
            return translate_ru[str] || str;
        default:
            return str;
    }
}

module.exports = {
    t
}
