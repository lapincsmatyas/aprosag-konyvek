/* eslint-disable*/
/*
import * as admin from "firebase-admin";

admin.initializeApp();


exports.sendOrderVerificationEmail = functions.firestore
  .document("orders/{orderId}")
  .onCreate(async (snapshot: FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>, context: EventContext) => {
      const data = snapshot.data();
      if (!data) {
        return null;
      }

      const gmailEmail = functions.config().gmail.email;
      const gmailPassword = functions.config().gmail.password;
      const mailTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailEmail,
          pass: gmailPassword,
        },
      });

      let mailOptions: { from: string, to: string, subject?: string, text?: string, html?: string };
      mailOptions = {
        from: "'Apróság könyvek' <aprosagkonyvek@gmail.com>",
        to: data.user?.email || "lapincs.matyas@gmail.com",
        subject: "Rendelés visszaigazolás",
        text: `Rendelésed ennyibe került: ${data.price}`
      };
      mailOptions.html = `
      <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <style>
              .title {
                font-weight: 800;
                font-size: 18px;
                margin-bottom: 20px;
              }
              .order-number-container{
                margin: 10px;
                border: 1px solid black;
              }
              .items-container{

              }
              table, th, td {
                border: 1px solid black;
                border-collapse: collapse;
                text-align: left;
              }
            </style>
          </head>
          <body>
            <div class="title">Szia! Megkaptuk a rendelésed!</div>
            <div class="text">Hamarosan nekiállunk a rendelésed feldolgozásának.</div>
            <div class="order-number-container">
                A te rendelési azonosítód:
                <div class="order-number">${data.orderNumber}</div>
            </div>
            <div class="items-container">
                <table class="items-table">
                 <tr>
                 <th>Termék</th>
                 <th>Ár</th>
                 <th>Mennyiség</th>
                 <th>Összesen</th>
                </tr>

                ${
        data.cart?.map((cartItem: any) => {
          return `<tr>
                        <td>${cartItem.item.title + " - " + cartItem.item.subtitle}</td>
                        <td>${cartItem.item.price}  Ft</td>
                        <td>${cartItem.amount}  db</td>
                        <td>${cartItem.amount * cartItem.item} Ft</td>
                    </tr>`
        })
      }
                <tr>
                        <td></td>
                        <td></td>
                        <td>Összesen:</td>
                        <td>${data.price} Ft</td>
                </tr>
                </table>
            </div>
          </body>
        </html>
      `;

      try {
        await mailTransport.sendMail(mailOptions);
        functions.logger.log(
          "Order confirmation email sent to:", data.user?.email
        );
      } catch (error) {
        functions.logger.error(
          "There was an error while sending the email:",
          error
        );
      }
      return null;
    }
  );

exports.sendNewsletter = functions.firestore
  .document("newsletters/{newsletterId}")
  .onCreate(async (snapshot: any, context: any) => {
      const data: { subject?: string, content?: string } = snapshot.data();
      if (!data) {
        return null;
      }

      const newsletterUsersRef = admin.firestore().collection('newsletter-users');
      const newsletterUsersSnapshot = await newsletterUsersRef.get();
      let emails: string[] = [];
      newsletterUsersSnapshot.forEach((doc) => {
        emails.push(doc.data().email);
      });

      const gmailEmail = functions.config().gmail.email;
      const gmailPassword = functions.config().gmail.password;
      const mailTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailEmail,
          pass: gmailPassword,
        },
      });


      let mailOptions: { from: string, bcc: string[], subject?: string, text?: string, html?: string };
      mailOptions = {
        from: "'Apróság könyvek' <aprosagkonyvek@gmail.com>",
        bcc: emails,
        subject: data.subject,
      };
      mailOptions.html = data.content;

      try {
        await mailTransport.sendMail(mailOptions);
        functions.logger.log(
          `Newsletter email sent to ${emails.length} recipients`
        );
      } catch (error) {
        functions.logger.error(
          "There was an error while sending the email:",
          error
        );
      }
      return null;
    }
  )
*/

/* eslint-enable*/
