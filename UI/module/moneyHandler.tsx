const moneyHandler = {
    convertToVND: (number : any) => {
        return Intl.NumberFormat('de-DE').format(number);
    }
}

export default moneyHandler;