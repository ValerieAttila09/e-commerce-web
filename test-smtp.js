/**
 * Test SMTP Connection
 * 
 * Usage: node test-smtp.js
 * 
 * This script tests if your SMTP credentials are valid
 * Run this before testing actual checkout to diagnose SMTP issues
 */

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function testSMTP() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.FROM_EMAIL;

  console.log('📧 Testing SMTP Connection...\n');
  console.log('Configuration:');
  console.log('  Host:', host);
  console.log('  Port:', port);
  console.log('  User:', user);
  console.log('  Secure:', port === 465 ? 'Yes (SSL)' : 'No (TLS)');
  console.log('  From:', from);
  console.log('');

  if (!host || !user || !pass) {
    console.error('❌ SMTP not configured. Check .env.local');
    process.exit(1);
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    console.log('🔍 Verifying SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!\n');

    // Send test email
    console.log('📤 Sending test email...');
    const info = await transporter.sendMail({
      from,
      to: user, // Send to self
      subject: '✅ ShopHub - SMTP Test Email',
      html: `
        <h2>SMTP Connection Test Successful! 🎉</h2>
        <p>This is a test email from ShopHub Email Notifier.</p>
        <p><strong>Configuration:</strong></p>
        <ul>
          <li>Host: ${host}:${port}</li>
          <li>From: ${from}</li>
          <li>Timestamp: ${new Date().toISOString()}</li>
        </ul>
        <p>Your email setup is working correctly!</p>
      `,
    });

    console.log('✅ Email sent successfully!');
    console.log('   Message ID:', info.messageId);
    console.log('\n📩 Check your inbox for the test email.');
    console.log('   (Check Spam/Promotions folder if not in Inbox)');

    process.exit(0);
  } catch (err) {
    console.error('❌ SMTP Error:', err.message);
    console.error('\nTroubleshooting:');

    if (err.message.includes('Invalid login')) {
      console.error('  - Check SMTP_USER and SMTP_PASS in .env.local');
      console.error('  - For Gmail: Use App Password, not regular password');
    } else if (err.message.includes('connect ECONNREFUSED')) {
      console.error('  - Check SMTP_HOST and SMTP_PORT');
      console.error('  - Verify internet connection');
    } else if (err.message.includes('Timeout')) {
      console.error('  - SMTP server not responding');
      console.error('  - Try different port (587 or 465)');
    }

    process.exit(1);
  }
}

testSMTP();
