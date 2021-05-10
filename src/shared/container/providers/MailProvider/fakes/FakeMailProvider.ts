import IMailProvider from '../models/IMailProvider';

interface IMessage {
  to: string;
  body: string;
  subject: string;
}

export default class FakeMailProvider implements IMailProvider {
  private messages: IMessage[] = [];

  public async sendEmail(
    to: string,
    body: string,
    subject: string,
  ): Promise<string | boolean> {
    this.messages.push({
      to,
      body,
      subject,
    });
    return '';
  }
}
