const User = require('../models/user');
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require("nodemailer");


function generateRandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
  
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    return result;
  }
const emailController = {
    sendEmail: async(req, res) => {
        const user = await User.findOne({ email : req.body.email });
        
        if(user) {
            const newPassword = generateRandomString();
            await User.findOneAndUpdate(
                { email: req.body.email },
                { password: newPassword },
                { new: true }
              );
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // Use `true` for port 465, `false` for all other ports
                auth: {
                  user: process.env.EMAIL_USERNAME,
                  pass: process.env.EMAIL_PASSWORD,
                },
              });
            const info = await transporter.sendMail({
                from: '"HY TRAVEL BUS" <vosonhung03@gmail.com>', // sender address
                to: req.body.email, // list of receivers
                subject: "<HY TRAVEL BUS>ĐẶT LẠI MẬT KHẨU", // Subject line
                text: "Hello world?", // plain text body
                html: `<h1>Mật khẩu mới của bạn là <h1>${newPassword}</h1></h1>
                <p>Hãy thay đổi mật khẩu ngay sau khi đăng nhập, xin chân thành cảm ơn</p>`, // html body
              });
            res.status(200).json(info);
            return info
        }
        else {
          res.status(404).json({ message : 'email not found'})
        }
        return null;

    }
};

module.exports = emailController;
