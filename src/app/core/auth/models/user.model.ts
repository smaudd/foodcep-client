export class User {
    constructor(
        readonly email: string,
        readonly password?: string,
        readonly name?: string,
        public invitation_code?: string,
        public language?: string,
        public currency?: string,
        readonly role?: string,
        public user_id?: number,
        ) {
    }
}
