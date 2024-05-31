const timeHandler = {
    convertHour(hour: number): string {
        // Tính toán giờ và phút từ số giờ
        const integerHour = Math.floor(hour);
        const minutes = Math.round((hour - integerHour) * 60);
    
        // Xây dựng chuỗi kết quả
        let result = `${integerHour}h`;
        if (minutes > 0) {
            result += `${minutes}m`;
        }
        return result;
    },
    addHours(timeStr : any, hoursToAdd : any) {
        // Chuyển chuỗi thời gian sang đối tượng Date
        const time = new Date(`2000-01-01T${timeStr}:00`);
        
        // Thêm số giờ
        time.setHours(time.getHours() + Math.floor(hoursToAdd));
        
        // Thêm số phút
        const decimalPart = hoursToAdd % 1;
        const minutesToAdd = decimalPart * 60;
        time.setMinutes(time.getMinutes() + Math.round(minutesToAdd));
        
        // Format lại thời gian
        const hours = time.getHours().toString().padStart(2, '0');
        const minutes = time.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
      },
      formatDateTime: (isoString : any) => {
        const date = new Date(isoString);
    
        // Extract hours and minutes
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        // Format hours and minutes
        const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    
        // Extract day, month, and year
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-indexed
        const year = date.getFullYear();
    
        // Format day, month, and year
        const formattedDate = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;
    
        return `${formattedTime} / ${formattedDate}`;
    },
    getCurrentISODateTime: () => {
        const now = new Date();
        return now.toISOString();
    }
}

export default timeHandler;