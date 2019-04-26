export class User {
    constructor(
        readonly email: string,
        readonly password?: string,
        readonly name?: string,
        readonly role?: string,
        public user_id?: string,
        public language?: string,
        public invitation_code?: string
        ) {
    }
}
