const bwipjs = require('bwip-js');
const fs = require('fs');
const path = require('path');

// Nội dung của mã vạch
const barcodeData = '26082003';

// Đường dẫn tới thư mục CODE128
const outputDir = path.join(__dirname, 'UI', 'Assets', 'CODE128');

// Kiểm tra và tạo thư mục nếu chưa tồn tại
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Tên tệp mã vạch
const barcodeFilename = `barcode_${barcodeData}.png`;

// Đường dẫn đầy đủ tới tệp mã vạch
const outputPath = path.join(outputDir, barcodeFilename);

// Tạo mã vạch
bwipjs.toBuffer({
    bcid: 'code128',       // Loại mã vạch
    text: barcodeData,     // Nội dung của mã vạch
    scale: 3,              // Tỉ lệ của mã vạch
    height: 10,            // Chiều cao của mã vạch
    includetext: true,     // Bao gồm nội dung của mã vạch dưới mã vạch
    textxalign: 'center',  // Canh giữa văn bản
}, function (err : any, png : String) {
    if (err) {
        console.error('Error generating barcode:', err);
    } else {
        // Lưu mã vạch dưới dạng tập tin ảnh
        fs.writeFile(outputPath, png, function (err : any) {
            if (err) {
                console.error('Error saving barcode:', err);
            } else {
                console.log(`Barcode saved as ${outputPath}`);
            }
        });
    }
});
