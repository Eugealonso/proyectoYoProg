export class Login{
    mail: string;
    pass: string;
    constructor(mail?: string, pass?: string){
        this.mail = mail;
        this.pass = pass;
    }
}