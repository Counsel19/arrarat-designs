/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import nodemailer from 'nodemailer';
import { Resend } from 'resend';
import { environmentConfig } from '@src/configs/custom-environment-variables.config';

const resend = new Resend(process.env.RESEND_API_KEY);

const host = environmentConfig.SMTP_HOST || '';
const emailUsername = environmentConfig.SMTP_USERNAME || '';
const password = environmentConfig.SMTP_PASSWORD || '';
const service = environmentConfig.SMTP_SERVICE || '';

export const transporter = nodemailer.createTransport({
  port: 587,
  service,
  host,
  secure: false,
  auth: {
    user: emailUsername,
    pass: password,
  },
});

let htmlContent = `<div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2
          style="text-align: center; text-transform: uppercase;color: teal;
            "
        >
          Welcome to Arrarat Designs
        </h2>
        <div style=" font-size: 1.3rem ">
          <p>Congratulations! You successfully signed up to Arrarat Designs App!</p>
          <p> click the button below to visit app </p>
          <a
            href="/"
            style="background: crimson; text-decoration: none; color: white; padding: 10px 30px; margin: 10px 0; display: inline-block;  border-radius: 6px;"
          >
            Visit App
          </a>
          <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        If you have any questions, just reply to this email
                        <span style="color: #4A35EA;">
                          ${environmentConfig.SUPPORT_EMAIL}
                        </span>
                        we're always happy to help out.
                      </p>
        </div>
      </div>`;

export const sendEmail = async (userEmail: any) => {
  await resend.emails.send({
    from: 'Arrarat Designs <no-reply@araratdesigns.org>',
    to: userEmail,
    subject: 'Signup succeeded!',
    html: htmlContent,
  });
};

// export const sendEmail = (userEmail: any) => {
//   const emailContent = {
//     from: environmentConfig?.ADMIN_SEND_GRID_EMAIL,
//     to: userEmail,
//     subject: 'Signup succeeded!',
//     html: htmlContent,
//   };

//   transporter.sendMail(emailContent, function (error, _info) {
//     if (error) {
//       if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
//         console.log('Sending Email error:', error);
//         console.log('Sending Email error:');
//       }
//     } else if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
//       console.log(`Successfully  send email to ${userEmail}...`);
//     }
//   });
// };

export const sendResetPasswordEmail = async (userEmail: string, userName: string, link: string) => {
  try {
    htmlContent = `
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email</title>
    <meta name="description" content="Reset Password Email ." />
    <style type="text/css">
      a:hover {
        text-decoration: underline !important;
      }
    </style>
  </head>
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table
      cellspacing="0"
      border="0"
      cellpadding="0"
      width="100%"
      bgcolor="#f2f3f8"
      style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"
    >
      <tr>
        <td>
          <table
            style="background-color: #f2f3f8; max-width:670px;  margin:0 auto; margin:auto; font-size: 110%;"
            width="100%"
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <a href="/" title="logo" target="_blank">
                  <img width="60" src="https://res.cloudinary.com/dduroqomj/image/upload/v1759946589/ararat_logo_f9u9pf.jpg" title="logo" alt="logo" />
                </a>
              </td>
            </tr>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table
                  width="95%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"
                >
                  <tr>
                    <td
                      style="height:40px; text-align: center; text-transform: uppercase;color: teal; padding: 1.3rem; font-weight:500; margin:0;font-size:23px;font-family:'Rubik',sans-serif;"
                    >
                      HI ${userName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 35px;">
                      <h1
                        style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;"
                      >
                        You have requested to reset your password
                      </h1>
                      <span
                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"
                      ></span>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        We cannot simply send you your old password. A unique link to reset your password has been
                        generated for you. To reset your password, Please click the following link and follow the
                        instructions. and If you did not request this, please ignore this email and your password will
                        remain unchanged.
                      </p>
                      <a
                        href=${link}
                        style="background: crimson; text-decoration: none; color: white; padding: 10px 30px; margin: 20px 0; display: inline-block;  border-radius: 6px;"
                      >
                        Reset Password
                      </a>
                       <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        If that doesn't work, copy and paste the following link in your browser:
                      </p>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        <a href="${link}" target="_blank" style="color: #4A35EA;"
                          >${link}</a
                        >
                      </p>
                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        If you have any questions, just reply to this email
                        <span style="color: #4A35EA;">
                          
                        </span>
                        we're always happy to help out.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="height:40px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">
                  &copy; <strong>${environmentConfig.SUPPORT_EMAIL}</strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!--/100% body table-->
  </body>
</html>
`;

    await resend.emails.send({
      from: 'Arrarat Designs <no-reply@araratdesigns.org>',
      to: userEmail,
      subject: 'Password Change Request',
      html: htmlContent,
    });

    // const emailContent = {
    //   from: environmentConfig.ADMIN_SEND_GRID_EMAIL,
    //   to: userEmail,
    //   subject: 'Password Change Request',
    //   html: htmlContent,
    // };

    // transporter.sendMail(emailContent, function (error, _info) {
    //   if (error) {
    //     if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
    //       console.log('Sending Email error:', error);
    //       console.log('Sending Email error:');
    //     }
    //   } else if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
    //     console.log(`Successfully  send email to ${userEmail}...`);
    //   }
    // });
  } catch (error) {
    console.error('❌ Error sending email:', error);
  }
};

export const sendConfirmResetPasswordEmail = async (userEmail: string, userName: string, link: string) => {
  try {
    htmlContent = `
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email</title>
    <meta name="description" content="Reset Password Email ." />
    <style type="text/css">
      a:hover {
        text-decoration: underline !important;
      }
    </style>
  </head>
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table
      cellspacing="0"
      border="0"
      cellpadding="0"
      width="100%"
      bgcolor="#f2f3f8"
      style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"
    >
      <tr>
        <td>
          <table
            style="background-color: #f2f3f8; max-width:670px;  margin:0 auto; margin:auto; font-size: 110%;"
            width="100%"
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <a href="/" title="logo" target="_blank">
                  <img width="60" src="https://res.cloudinary.com/dduroqomj/image/upload/v1759946589/ararat_logo_f9u9pf.jpg" title="logo" alt="logo" />
                </a>
              </td>
            </tr>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table
                  width="95%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"
                >
                  <tr>
                    <td
                      style="height:40px; text-align: center; text-transform: uppercase;color: teal; padding: 1.3rem; font-weight:500; margin:0;font-size:23px;font-family:'Rubik',sans-serif;"
                    >
                      HI ${userName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 35px;">
                      <h1
                        style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;"
                      >
                        Password Reset Success
                      </h1>
                      <span
                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"
                      ></span>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        Your password has been Successfully updated
                      </p>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        We're excited to have you get started Just press the button below to login
                      </p>
                      <a
                        href="${link}"
                        style="background:  #3385ff; text-decoration: none; color: white; padding: 10px 30px; margin: 20px 0; display: inline-block;  border-radius: 6px;"
                      >
                        Login
                      </a>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        If that doesn't work, copy and paste the following link in your browser:
                      </p>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        <a href="${link}" target="_blank" style="color: #4A35EA;"
                          >${link}</a
                        >
                      </p>
                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        If you have any questions, just reply to this email
                        <span style="color: #4A35EA;">
                            ${environmentConfig.SUPPORT_EMAIL}
                        </span>
                        we're always happy to help out.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="height:40px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">
                  &copy; <strong>  ${environmentConfig.BASE_URL}</strong>
                </p>
                
              </td>
            </tr>
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!--/100% body table-->
  </body>
</html>
`;

    // const emailContent = {
    //   from: environmentConfig.ADMIN_SEND_GRID_EMAIL,
    //   to: userEmail,
    //   subject: 'Password Reset Success',
    //   html: htmlContent,
    // };

    // transporter.sendMail(emailContent, function (error, _info) {
    //   if (error) {
    //     if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
    //       console.log('Sending Email error:', error);
    //     }
    //   } else if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
    //     console.log(`Successfully  send email to ${userEmail}...`);
    //   }
    // });

    const data = await resend.emails.send({
      from: 'Arrarat Designs <no-reply@araratdesigns.org>',
      to: userEmail,
      subject: 'Password Reset Success',
      html: htmlContent,
    });

    console.log(data, 'Resend Response');
  } catch (error) {
    console.log(error, 'error');
    if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
      console.log('Sending Email error:', error);
      console.log('Sending Email error:');
    }
  }
};

export const sendEmailVerificationEmail = async (userEmail: string, userName: string, link: string) => {
  try {
    htmlContent = `
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>email verification</title>
    <meta name="description" content="Reset Password Email ." />
    <style type="text/css">
      a:hover {
        text-decoration: underline !important;
      }
    </style>
  </head>
  <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table
      cellspacing="0"
      border="0"
      cellpadding="0"
      width="100%"
      bgcolor="#f2f3f8"
      style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;"
    >
      <tr>
        <td>
          <table
            style="background-color: #f2f3f8; max-width:670px;  margin:0 auto; margin:auto; font-size: 110%;"
            width="100%"
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <a href="" title="logo" target="_blank">
                  <img width="60" src="https://res.cloudinary.com/dduroqomj/image/upload/v1759946589/ararat_logo_f9u9pf.jpg" title="logo" alt="logo" />
                </a>
              </td>
            </tr>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
              <td>
                <table
                  width="95%"
                  border="0"
                  align="center"
                  cellpadding="0"
                  cellspacing="0"
                  style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);"
                >
                  <tr>
                    <td
                      style="height:40px; text-align: center; text-transform: uppercase;color: teal; padding: 1.3rem; font-weight:500; margin:0;font-size:23px;font-family:'Rubik',sans-serif;"
                    >
                      HI ${userName}
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:0 35px;">
                      <h1
                        style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;"
                      >
                        Confirm Your Email Address
                      </h1>
                      <span
                        style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"
                      ></span>
                      <p style="color:#455056; font-size:15px;">
                        Kindly verify your email to complete your account registration.
                      </p>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        You are just one step away please click the button below to verify your email. and If you
                        received this email by mistake, simply delete it. You won't be subscribed if you don't click the
                        confirmation link blow.
                      </p>
                      <a
                        href="${link}"
                        style="background:  #1a82e2; text-decoration: none; color: white; padding: 10px 30px; margin: 20px 0; display: inline-block;  border-radius: 6px;"
                      >
                        Confirm email
                      </a>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        If that doesn't work, copy and paste the following link in your browser:
                      </p>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        <a href="${link}" target="_blank" style="color: #4A35EA;">${link}</a>
                      </p>
                      <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                        If you have any questions, just reply to this email
                        <span style="color: #4A35EA;">
                          ${environmentConfig.SUPPORT_EMAIL}
                        </span>
                        we're always happy to help out.
                      </p>
                    </td>
                  </tr>
                  <tr>
                    <td style="height:40px;">&nbsp;</td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="height:20px;">&nbsp;</td>
            </tr>
            <tr>
              <td style="text-align:center;">
                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">
                  &copy; <strong>
                       ${environmentConfig.BASE_URL}
                  </strong>
                </p>
              </td>
            </tr>
            <tr>
              <td style="height:80px;">&nbsp;</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <!--/100% body table-->
  </body>
</html>
`;

    // const emailContent = {
    //   from: environmentConfig.ADMIN_SEND_GRID_EMAIL,
    //   to: userEmail,
    //   subject: 'Email Verification',
    //   html: htmlContent,
    // };

    // transporter.sendMail(emailContent, function (error, _info) {
    //   console.log(error, 'error');
    //   console.log(_info, '_info');
    //   if (error) {
    //     if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
    //       console.log('Sending Email error:', error);
    //       console.log('Sending Email error:');
    //     }
    //   } else if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
    //     console.log(`Successfully  send email to ${userEmail}...`);
    //   }
    // });

    const data = await resend.emails.send({
      from: 'Arrarat Designs <no-reply@araratdesigns.org>',
      to: userEmail,
      subject: 'Email Verification',
      html: htmlContent,
    });

    console.log(data, 'data');
  } catch (error) {
    console.log('Sending Email error:', error);
    if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
      console.log('Sending Email error:');
    }
  }
};

type NewOrderNotificationPayload = {
  adminEmail?: string;
  customerName: string;
  customerPhone?: string;
  invoiceNumber: string;
  orderId: string;
  totalAmount: number;
  whatsappUrl?: string;
};

export const sendNewOrderNotificationEmail = async ({
  adminEmail,
  customerName,
  customerPhone,
  invoiceNumber,
  orderId,
  totalAmount,
  whatsappUrl,
}: NewOrderNotificationPayload) => {
  if (!adminEmail) return;
  
  const whatsappLink = whatsappUrl 
    ? `<p><a href="${whatsappUrl}" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Contact Customer on WhatsApp</a></p>`
    : customerPhone 
      ? `<p><strong>Customer Phone:</strong> <a href="tel:${customerPhone}">${customerPhone}</a></p><p>Please reach out to the customer via WhatsApp using the phone number above to continue fulfilment.</p>`
      : '<p>Please reach out to the customer via WhatsApp to continue fulfilment.</p>';
  
  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>New Order Alert</h2>
      <p>A new order has been placed.</p>
      <ul>
        <li><strong>Customer:</strong> ${customerName}</li>
        ${customerPhone ? `<li><strong>Customer Phone:</strong> <a href="tel:${customerPhone}">${customerPhone}</a></li>` : ''}
        <li><strong>Order ID:</strong> ${orderId}</li>
        <li><strong>Invoice Number:</strong> ${invoiceNumber}</li>
        <li><strong>Total:</strong> ₦${totalAmount.toLocaleString()}</li>
      </ul>
      ${whatsappLink}
    </div>
  `;

  await resend.emails.send({
    from: 'Arrarat Designs <no-reply@araratdesigns.org>',
    to: adminEmail,
    subject: `New order ${invoiceNumber}`,
    html,
  });
};

type OrderConfirmationPayload = {
  customerEmail: string;
  customerName: string;
  invoiceNumber: string;
  orderId: string;
  totalAmount: number;
  orderItems?: Array<{
    name: string;
    quantity: number;
    unitPrice?: number;
    price?: number;
  }>;
  shippingAddress?: string;
};

type PaymentConfirmationPayload = {
  customerEmail: string;
  customerName: string;
  invoiceNumber: string;
  orderId: string;
};

export const sendOrderConfirmationEmail = async ({
  customerEmail,
  customerName,
  invoiceNumber,
  orderId,
  totalAmount,
  orderItems,
  shippingAddress,
}: OrderConfirmationPayload) => {
  if (!customerEmail) return;
  
  const itemsList = orderItems?.map((item: any, index: number) => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${index + 1}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name || 'Product'}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity || 1}</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₦${((item.unitPrice || item.price || 0) * (item.quantity || 1)).toLocaleString()}</td>
    </tr>
  `).join('') || '<tr><td colspan="4" style="padding: 8px; text-align: center;">No items found</td></tr>';
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #0f2a45; margin-top: 0;">Order Confirmed!</h2>
        <p>Hi ${customerName},</p>
        <p>Thank you for your order with Ararat Designs. We've received your order and it's being processed.</p>
      </div>
      
      <div style="background-color: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 20px;">
        <h3 style="color: #0f2a45; margin-top: 0; border-bottom: 2px solid #0f2a45; padding-bottom: 10px;">Order Details</h3>
        <table style="width: 100%; margin-bottom: 15px;">
          <tr>
            <td style="padding: 5px 0;"><strong>Order ID:</strong></td>
            <td style="padding: 5px 0;">${orderId}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;"><strong>Invoice Number:</strong></td>
            <td style="padding: 5px 0;">${invoiceNumber}</td>
          </tr>
          <tr>
            <td style="padding: 5px 0;"><strong>Order Total:</strong></td>
            <td style="padding: 5px 0;"><strong>₦${totalAmount.toLocaleString()}</strong></td>
          </tr>
        </table>
      </div>
      
      ${shippingAddress ? `
      <div style="background-color: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 20px;">
        <h3 style="color: #0f2a45; margin-top: 0; border-bottom: 2px solid #0f2a45; padding-bottom: 10px;">Shipping Address</h3>
        <p style="margin: 5px 0;">${shippingAddress}</p>
      </div>
      ` : ''}
      
      <div style="background-color: #fff; padding: 20px; border-radius: 8px; border: 1px solid #e0e0e0; margin-bottom: 20px;">
        <h3 style="color: #0f2a45; margin-top: 0; border-bottom: 2px solid #0f2a45; padding-bottom: 10px;">Order Items</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #0f2a45;">#</th>
              <th style="padding: 10px; text-align: left; border-bottom: 2px solid #0f2a45;">Product</th>
              <th style="padding: 10px; text-align: center; border-bottom: 2px solid #0f2a45;">Qty</th>
              <th style="padding: 10px; text-align: right; border-bottom: 2px solid #0f2a45;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsList}
          </tbody>
        </table>
      </div>
      
      <div style="background-color: #e8f5e9; padding: 15px; border-radius: 8px; border-left: 4px solid #4caf50;">
        <p style="margin: 0; color: #2e7d32;"><strong>Next Steps:</strong></p>
        <p style="margin: 5px 0 0 0;">Our team will reach out to you via WhatsApp to confirm payment instructions and provide delivery updates. Please keep your invoice number (${invoiceNumber}) ready for reference.</p>
      </div>
      
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; color: #6c757d; font-size: 12px;">
        <p>Thank you for shopping with Ararat Designs!</p>
        <p>If you have any questions, please don't hesitate to contact our support team.</p>
      </div>
    </div>
  `;

  await resend.emails.send({
    from: 'Arrarat Designs <no-reply@araratdesigns.org>',
    to: customerEmail,
    subject: `Order Confirmed - ${invoiceNumber}`,
    html,
  });
};

export const sendPaymentConfirmationEmail = async ({
  customerEmail,
  customerName,
  invoiceNumber,
  orderId,
}: PaymentConfirmationPayload) => {
  const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>Payment Confirmed</h2>
      <p>Hi ${customerName},</p>
      <p>Your payment for invoice <strong>${invoiceNumber}</strong> has been confirmed.</p>
      <p>Order ID: <strong>${orderId}</strong></p>
      <p>Our team will reach out with delivery updates.</p>
      <p>Thank you for shopping with Ararat Designs.</p>
    </div>
  `;

  await resend.emails.send({
    from: 'Arrarat Designs <no-reply@araratdesigns.org>',
    to: customerEmail,
    subject: `Payment confirmation - ${invoiceNumber}`,
    html,
  });
};

export default {
  sendEmailVerificationEmail,
  sendEmail,
  sendResetPasswordEmail,
  sendConfirmResetPasswordEmail,
  sendNewOrderNotificationEmail,
  sendOrderConfirmationEmail,
  sendPaymentConfirmationEmail,
};
