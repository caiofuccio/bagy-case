import nodeMailer, { Transporter } from 'nodemailer';
import IMailProvider from '../models/IMailProvider';

export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  private async createAccount() {
    if (this.client) {
      return;
    }
    const account = await nodeMailer.createTestAccount();
    const transporter = nodeMailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    this.client = transporter;
  }

  async sendEmail(
    to: string,
    body: string,
    subject: string,
  ): Promise<string | boolean> {
    await this.createAccount();
    const message = await this.client.sendMail({
      from: 'Bagy <bagy@bagy.com.br>',
      to,
      subject,
      text: body,
    });
    return nodeMailer.getTestMessageUrl(message);
  }
}
