import { sign, verify, TokenExpiredError } from 'jsonwebtoken';
import { Config }  from '../utils/config';

export class GenerateToken {
    constructor() {}

    private EXPIRETIME: string = '120s';

    public getToken(username: any): any {
        let token = null;
        if (username !=  undefined)
        {
            token = sign(username, Config.secret, {expiresIn : this.EXPIRETIME});
            return token;
        }
        return token;
    }

    public verifyToken(headertoken: String): boolean{
        let isVerified = false;
        if (headertoken != undefined)
        {
            const token = headertoken.split('')[1];
            verify(token, Config.secret, (err) => {
                if (err) {
                    if (err instanceof TokenExpiredError) {
                        return isVerified;
                    }
                    return isVerified;
                } else {
                    isVerified = true;
                    return isVerified;
                }
            })
        }
        return isVerified;
    }
}