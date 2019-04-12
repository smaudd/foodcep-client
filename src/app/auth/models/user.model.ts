export class User {
    constructor(
        readonly email: string,
        readonly password?: string,
        readonly name?: string,
        readonly role?: string,
        public _id?: string,
        public language?: string
        ) {
    }
}
