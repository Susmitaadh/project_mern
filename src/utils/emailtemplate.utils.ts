const formatDate = (date: NativeDate) => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(date));
};

//* generateAccountCreatedHtml
export const generateAccountCreatedHtml = ({
  full_name,
  email,
  created_at,
  agent,
}: {
  full_name: string;
  email: string;
  created_at: NativeDate;
  agent: string;
}) => {
  const formattedDate = formatDate(created_at);

  const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Welcome to Our Platform</title>
      </head>

      <body style="
        margin: 0;
        padding: 0;
        background-color: #f5f3ff;
        font-family: Arial, sans-serif;
      ">

        <div style="
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(109, 40, 217, 0.12);
        ">

          <!-- Header -->
          <div style="
            background: linear-gradient(135deg, #7c3aed, #4c1d95);
            padding: 40px 30px;
            text-align: center;
            color: #ffffff;
          ">
            <div style="
              font-size: 13px;
              letter-spacing: 3px;
              text-transform: uppercase;
              margin-bottom: 15px;
              color: #ddd6fe;
            ">
              Welcome aboard
            </div>

            <h1 style="
              margin: 0;
              font-size: 30px;
              line-height: 1.3;
            ">
              Hello, ${full_name}!
            </h1>

            <p style="
              margin: 15px 0 0;
              font-size: 16px;
              line-height: 1.6;
              color: #ede9fe;
            ">
              Your account is ready.
              We're excited to have you with us!
            </p>
          </div>

          <!-- Main Content -->
          <div style="
            padding: 35px 30px;
            color: #374151;
          ">

            <h2 style="
              margin: 0 0 15px;
              color: #6d28d9;
              font-size: 22px;
            ">
              Account Created Successfully
            </h2>

            <p style="
              font-size: 15px;
              line-height: 1.8;
              margin: 0 0 20px;
            ">
              Dear <strong>${full_name}</strong>,
            </p>

            <p style="
              font-size: 15px;
              line-height: 1.8;
              margin: 0 0 25px;
            ">
              Thank you for joining us. Your registration has been
              completed successfully, and you can now start exploring
              everything our platform has to offer.
            </p>

            <!-- Account Details -->
            <div style="
              background-color: #f5f3ff;
              border: 1px solid #ddd6fe;
              border-radius: 10px;
              padding: 25px;
              margin-bottom: 25px;
            ">

              <h3 style="
                color: #6d28d9;
                margin: 0 0 20px;
                font-size: 18px;
              ">
                Your Account Details
              </h3>

              <p style="
                margin: 0 0 15px;
                font-size: 14px;
                line-height: 1.6;
              ">
                <strong style="color: #4c1d95;">Full Name</strong><br />
                ${full_name}
              </p>

              <p style="
                margin: 0 0 15px;
                font-size: 14px;
                line-height: 1.6;
              ">
                <strong style="color: #4c1d95;">Email Address</strong><br />
                ${email}
              </p>

              <p style="
                margin: 0;
                font-size: 14px;
                line-height: 1.6;
              ">
                <strong style="color: #4c1d95;">Account Created</strong><br />
                ${formattedDate}
              </p>

            </div>

            <!-- Security / Browser Information -->
            <div style="
              background-color: #faf5ff;
              border-left: 4px solid #8b5cf6;
              padding: 18px 20px;
              border-radius: 6px;
              margin-bottom: 25px;
            ">

              <h3 style="
                margin: 0 0 10px;
                color: #6d28d9;
                font-size: 16px;
              ">
                Registration Information
              </h3>

              <p style="
                margin: 0;
                font-size: 13px;
                line-height: 1.7;
                color: #4b5563;
                word-break: break-word;
              ">
                <strong>Browser / Device:</strong><br />
                ${agent}
              </p>

            </div>

            <p style="
              font-size: 14px;
              line-height: 1.8;
              color: #4b5563;
            ">
              If you did not create this account, please contact our
              support team immediately.
            </p>

            <p style="
              margin-top: 30px;
              font-size: 15px;
              line-height: 1.8;
            ">
              Best regards,<br />
              <strong style="color: #7c3aed;">
                The Team
              </strong>
            </p>

          </div>

          <!-- Footer -->
          <div style="
            background-color: #ede9fe;
            padding: 25px 20px;
            text-align: center;
            color: #6b21a8;
            font-size: 12px;
            line-height: 1.7;
          ">
            <p style="margin: 0 0 8px;">
              This is an automated email. Please do not reply.
            </p>

            <p style="margin: 0;">
              &copy; ${new Date().getFullYear()} All rights reserved.
            </p>
          </div>

        </div>

      </body>
    </html>
  `;

  return html;
};

//* generate new login detected html template
export const generateNewLoginDetectedHtml = ({
  full_name,
  email,
  loggedIn_at,
  agent,
}: {
  full_name: string;
  email: string;
  loggedIn_at: NativeDate;
  agent: string;
}) => {
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Login Detected</title>
      </head>
      <body style="
        margin: 0;
        padding: 0;
        background-color: #f5f3ff;
        font-family: Arial, Helvetica, sans-serif;
        color: #1f2937;
      ">
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
          style="background-color: #f5f3ff; padding: 40px 0;"
        >
          <tr>
            <td align="center">
              <table
                width="600"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="
                  max-width: 600px;
                  width: 100%;
                  background-color: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                "
              >
                <!-- Header -->
                <tr>
                  <td style="
                    background-color: #6d28d9;
                    padding: 30px;
                    text-align: center;
                    color: #ffffff;
                  ">
                    <h1 style="
                      margin: 0;
                      font-size: 26px;
                    ">
                      New Login Detected
                    </h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 35px 30px;">
                    <h2 style="
                      margin-top: 0;
                      font-size: 22px;
                      color: #4c1d95;
                    ">
                      Hello ${full_name},
                    </h2>

                    <p style="
                      font-size: 15px;
                      line-height: 1.7;
                      color: #4b5563;
                    ">
                      We noticed a new login to your account.
                      Here are the details:
                    </p>

                    <!-- Login Details -->
                    <table
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                      style="
                        background-color: #f5f3ff;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 20px 0;
                      "
                    >
                      <tr>
                        <td style="padding: 8px 0; font-size: 14px;">
                          <strong style="color: #6d28d9;">Email:</strong>
                          <span>${email}</span>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 8px 0; font-size: 14px;">
                          <strong style="color: #6d28d9;">Login Time:</strong>
                          <span>${formatDate(loggedIn_at)}</span>
                        </td>
                      </tr>

                      <tr>
                        <td style="padding: 8px 0; font-size: 14px;">
                          <strong style="color: #6d28d9;">Device / Browser:</strong>
                          <span>${agent}</span>
                        </td>
                      </tr>
                    </table>

                    <p style="
                      font-size: 15px;
                      line-height: 1.7;
                      color: #4b5563;
                    ">
                      If this was you, no further action is needed.
                    </p>

                    <p style="
                      font-size: 15px;
                      line-height: 1.7;
                      color: #4b5563;
                    ">
                      If you don't recognize this activity, please
                      change your password immediately and secure
                      your account.
                    </p>

                    <p style="
                      margin-top: 30px;
                      font-size: 15px;
                      color: #4b5563;
                    ">
                      Stay safe,<br />
                      <strong style="color: #6d28d9;">
                        The Security Team
                      </strong>
                    </p>
                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td style="
                    background-color: #faf5ff;
                    padding: 20px;
                    text-align: center;
                    font-size: 12px;
                    color: #6b7280;
                  ">
                    This is an automated security notification.
                    Please do not reply to this email.
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  return html;
};
