export default interface IMailProvider {
  sendEmail(
    to: string,
    body: string,
    subject: string,
  ): Promise<string | boolean>;
}
