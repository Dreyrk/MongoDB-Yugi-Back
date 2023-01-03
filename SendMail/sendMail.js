import transporter from "./mailer";

transporter.sendMail(
  {
    from: "lulu69360@gmail.com",
    to: "darkdreyrk@gmail.com",
    subject: "This is a test email",
    text: "Hello world",
    html: "<p>Hello <em>world</em></p>",
  },
  (err, info) => {
    if (err) console.error(err);
    else console.log(info);
  }
);
