const nodemailer = require('nodemailer');

exports.sendContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email and message are required' });
    }

    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST || 'smtp.gmail.com',
        port: Number(process.env.EMAIL_PORT) || 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_TO || process.env.EMAIL_USER,
        replyTo: email,
        subject: `[BK-Architecture] ${subject || 'Nouveau message de contact'}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #C9A84C; border-bottom: 2px solid #C9A84C; padding-bottom: 10px;">
              Nouveau message - BK-Architecture
            </h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold;">Nom:</td><td style="padding: 8px;">${name}</td></tr>
              <tr><td style="padding: 8px; font-weight: bold;">Email:</td><td style="padding: 8px;">${email}</td></tr>
              ${phone ? `<tr><td style="padding: 8px; font-weight: bold;">Téléphone:</td><td style="padding: 8px;">${phone}</td></tr>` : ''}
              ${subject ? `<tr><td style="padding: 8px; font-weight: bold;">Sujet:</td><td style="padding: 8px;">${subject}</td></tr>` : ''}
            </table>
            <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-left: 4px solid #C9A84C;">
              <p style="font-weight: bold;">Message:</p>
              <p style="white-space: pre-line;">${message}</p>
            </div>
          </div>
        `,
      });
    }

    res.json({ success: true, message: 'Message sent successfully' });
  } catch (error) {
    console.error('Contact error:', error);
    res.status(500).json({ success: false, message: 'Failed to send message' });
  }
};
