# EmailJS Setup Guide

This portfolio uses EmailJS to send emails from the contact form. Follow these steps to set it up:

## 1. Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)

## 2. Add Email Service

1. Go to **Email Services** in your EmailJS dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps
5. Note your **Service ID**

## 3. Create Email Template

1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use this template structure:

```
Subject: New Contact from {{from_name}} - {{subject}}

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Note your **Template ID**

## 4. Get Public Key

1. Go to **Account** > **General**
2. Find your **Public Key** (formerly User ID)
3. Copy this key

## 5. Configure Environment Variables

Create a `.env` file in your project root:

```env
REACT_APP_EMAILJS_SERVICE_ID=your_service_id_here
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id_here
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Important:** Add `.env` to your `.gitignore` file to keep your keys secure!

## 6. Install Dependencies

Run:
```bash
npm install
```

This will install `@emailjs/browser` package.

## 7. Test the Form

1. Start your development server: `npm start`
2. Go to the Contact section
3. Fill out and submit the form
4. Check your email inbox for the message
5. Check the browser console for any errors

## EmailJS Template Variables

The contact form sends these variables to EmailJS:

- `from_name` - User's name
- `from_email` - User's email address
- `subject` - Message subject
- `message` - Message content
- `to_name` - Your name (recipient)

## Free Tier Limits

- 200 emails per month
- Rate limiting: 1 email per 5-10 seconds per user
- Good for portfolio and personal websites

## Troubleshooting

### "Failed to send message"
- Check your environment variables are set correctly
- Verify your EmailJS service is active
- Check browser console for detailed error messages
- Ensure you're not exceeding rate limits

### "CORS error"
- Make sure you added your domain to EmailJS dashboard
- Go to Account > Security > Add your website URL

### "Invalid template"
- Verify template variables match the ones in Contact.jsx
- Check template ID is correct

## Production Deployment

For Vercel/Netlify/other platforms:

1. Add environment variables in your hosting platform's dashboard
2. Use the same variable names (REACT_APP_EMAILJS_SERVICE_ID, etc.)
3. Rebuild and redeploy your application

## Alternative: Email Services

If you prefer other email services:

- **Formspree** - https://formspree.io/
- **SendGrid** - https://sendgrid.com/
- **Netlify Forms** - Built-in if using Netlify
- **Web3Forms** - https://web3forms.com/

## Need Help?

- EmailJS Docs: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/

---

✅ Once configured, your contact form will send real emails!

