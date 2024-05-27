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
      }
}

export default timeHandler;