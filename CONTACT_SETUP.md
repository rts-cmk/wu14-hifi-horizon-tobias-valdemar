# Contact Form Setup with Resend

This project uses Vercel serverless functions and Resend to handle contact form submissions.

## Why This Approach?

✅ **You build the API** - Custom serverless function shows real backend development skills  
✅ **No domain needed** - Resend provides `onboarding@resend.dev` for testing  
✅ **Super simple** - Just 3 lines of code to send emails  
✅ **Free tier** - 100 emails/day, 3,000/month

## Setup Instructions

### 1. Get Resend API Key

1. Sign up at [Resend](https://resend.com/)
2. Go to API Keys section
3. Create a new API key
4. Copy the API key

### 2. Local Development

1. Create a `.env` file in the root directory:

   ```bash
   cp .env.example .env
   ```

2. Fill in your environment variables in `.env`:

   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   RECIPIENT_EMAIL=your-email@example.com
   ```

3. Install dependencies (already done):

   ```bash
   npm install
   ```

4. For local testing with Vercel functions, install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

5. Run locally:
   ```bash
   vercel dev
   ```

### 3. Deploy to Vercel

1. Login to Vercel:

   ```bash
   vercel login
   ```

2. Deploy:

   ```bash
   vercel
   ```

3. Add environment variables in Vercel dashboard:

   - Go to your project settings
   - Navigate to "Environment Variables"
   - Add:
     - `RESEND_API_KEY`
     - `RECIPIENT_EMAIL`

4. Redeploy to apply environment variables

## How It Works

1. User fills out the contact form on your React site
2. Form submits POST request to `/api/contact` **YOUR custom serverless function**
3. Your function validates the data
4. Your function sends email via Resend API
5. User receives success/error message
6. Email arrives in your inbox

## Project Files

- `/api/contact.js` - **YOUR serverless API endpoint** (this is what you built!)
- `/src/Pages/Contact.jsx` - Contact form React component
- `/src/Styles/contact.scss` - Contact form styles
- `.env.example` - Example environment variables

## API Endpoint Details

**Endpoint:** `POST /api/contact`

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "subject": "string",
  "message": "string"
}
```

**Success Response:** `200`

```json
{
  "success": true,
  "message": "Email sent successfully"
}
```

**Error Responses:**

- `400` - Missing required fields
- `405` - Wrong HTTP method
- `500` - Server error

## Testing

You can test the API directly with curl:

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Subject",
    "message": "This is a test message"
  }'
```

## Notes

- Uses Resend's trial domain `onboarding@resend.dev` - no verification needed
- Reply-to is automatically set to the submitter's email
- All form fields are validated and required
- CORS is automatically handled by Vercel
- Button disables during submission to prevent double-sends
