const dateHandler = {
    formatDate(date : any) {
        const arr = date.split("/");
        var formatedDate = "";
        arr.reverse();
        arr.forEach((element: any) => {
            formatedDate = formatedDate + element + "/";
        });
        formatedDate = formatedDate.slice(0, -1);
        return formatedDate;
    },
    formatVNDate(date : any) {
        const arr = date.split("/");
        arr.reverse();
        var formatedDate = "Ngày " + arr[0] + " Tháng " + arr[1] + " Năm " + arr[2];
        return formatedDate;
    },
    formatVNDateForTrip(inputDate : any) {
        const inputString = "2024-05-26T20:06:45.524+00:00";

        // Chuyển đổi chuỗi thành đối tượng Date
        const date = new Date(inputDate);
        
        // Lấy các thành phần năm, tháng, ngày
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0, nên cần +1
        const day = date.getDate().toString().padStart(2, '0');
        
        // Tạo định dạng YYYY-MM-DD
        const formattedDate = `${year}-${month}-${day}`;
        //console.log(formattedDate); // Output: 2024-05-26
        
        // Tạo định dạng DD/MM/YYYY
        const formattedDate2 = `${day}/${month}/${year}`;
        //console.log(formattedDate2); // Output: 26/05/2024
        return formattedDate2;
    },
    formatDBDate(date : string) {
        const arr = date.split("/");
        var formatedDate =  arr[0] + "-" + arr[1] + "-" + arr[2];
        return formatedDate;
    },
    toTimeDate(departureTime : any, date : any, estimatedTime : any) {
        // Chuyển đổi date từ string sang đối tượng Date
        let dateObj = new Date(date);
      
        // Tách giờ và phút từ departureTime
        const [hour, minute] = departureTime.split(':').map(Number);
      
        // Cập nhật giờ và phút cho đối tượng Date
        dateObj.setHours(hour, minute);
      
        // Cộng thêm estimatedTime (giờ) vào đối tượng Date
        dateObj.setHours(dateObj.getHours() + estimatedTime);
      
        // Lấy ngày, tháng và năm từ đối tượng Date
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Tháng tính từ 0 nên phải +1
        const year = dateObj.getFullYear();
      
        // Trả về kết quả dưới dạng "DD-MM-YYYY"
        return `${day}/${month}/${year}`;
      }
}

export default dateHandler;