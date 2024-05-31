import { Platform } from "react-native";
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import dateHandler from "./dateHandler";

const pdfGenerator = {
    createPDF: async (ticket : any) => {
        try {
          let PDFOptions = {
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>E-ticket</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        width: 700px;
                        margin: 20px auto;
                        padding: 50px;
                    }
                    .header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }
                    .header img {
                        height: 50px;
                    }
                    .header h1 {
                        font-size: 30px;
                        margin: 0;
                        color: "#078511";
                    }
                    .info {
                        margin: 20px 0;
                    }
                    .info div {
                        margin: 10px 0;
                    }
                    .info .flight-details {
                        display: flex;
                        justify-content: space-between;
                    }
                    .info .flight-details div {
                        width: 48%;
                    }
                    .footer {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-top: 20px;
                    }
                    .footer div {
                        width: 30%;
                    }
                    .footer img {
                        height: 20px;
                    }
            
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>HY TRAVELBUS</h1>
                        <h1>E-ticket / Vé điện tử</h1>
                    </div>
                    <div class="info">
                        <div class="flight-details">
                            <div>
                                <p><strong>HY TRAVELBUS</strong></p>
                                <p>Biển số xe: ${ticket.coachLicensePlate}</p>
                                <p>Economy</p>
                            </div>
                            <div>
                                <p><strong>${dateHandler.formatVNDate(ticket.date)}</strong></p>
                                <p>- ${ticket.departureTime} (${dateHandler.formatDate(ticket.date)}) ${ticket.departure}</p>
                                <p><strong>Nơi đi:</strong> ${ticket.departureDescriptions}</p>
                                <p>- ${ticket.arrivalTime} (${ticket.arrivalDate}) ${ticket.destination}</p>
                                <p><strong>Nơi đến:</strong> ${ticket.destinationDescriptions}</p>
                            </div>
                        </div>
                        <div>
                            <p><strong>HY TRAVELBUS Booking ID</strong></p>
                            <p>${ticket._id}</p>
                            <p><strong>Status</strong>: Được hoàn vé</p>
                        </div>
                    </div>
                    <div class="footer">
                        <div>
                            <h1>Thủ tục checkin</h1>
                            <p>Trình CMND/CCCD và vé khi làm thủ tục tại bến</p>
                        </div>
                        <div>
                            <h1>Hành lý kí gửi</h1>
                            <p>Hàng khách có 20kg hành lý kí gửi</p>
                        </div>
                        <div>
                            <h1>Thời gian checkin</h1>
                            <p>Làm thủ tục ít nhất 90 phút trước giờ khởi hành</p>
                        </div>
                        
                    </div>
                    <div>
                    <div>
                        <h1>Thông tin hành khách</h1>
                        <p class="footer"><strong>Họ và tên: ${ticket.guestName}</strong><strong>CCCD/CMND: ${ticket.identifyNumber}</strong> </p>
                    </div>    
                </div>
                </div>
            </body>
            </html>            
            `,
            fileName: `${ticket.ticket._id}_Eticket`,
            directory: Platform.OS === 'android' ? '../../../../Download' : 'Documents',
          };
            let file = await RNHTMLtoPDF.convert(PDFOptions);
            if (!file.filePath) return;
            console.log(file.filePath);
          
        } catch (error : any) {
          console.log('Failed to generate pdf', error.message);
        }
      }
}

export default pdfGenerator;