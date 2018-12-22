import 'mocha';
import { expect, assert, should} from 'chai';
import * as sinon from 'sinon';
import * as jwt from 'jsonwebtoken';
import { GenerateToken  } from './token';


describe('TOKENIZATION', () => {
    let generateTokenStub;

    beforeEach(() => {
        generateTokenStub = new GenerateToken();
    });

    afterEach(() => {

    })
    it('GetToken return null while input value is undefine', ()=> {

        //Act 
        const result = generateTokenStub.getToken(undefined);
        
        //Assert
        expect(result).be.null;
    });

    it('GetToken return token while input value is define', () => {
        //Arrange
        const tokenStub = 'abcxyz12345'
        const signStub = sinon.stub(jwt, 'sign').returns(tokenStub);

        //Act
        const result = generateTokenStub.getToken('xyz');

        //Assert
        expect(signStub.calledOnce, "Jsonwebtoken Sign is called Once");
        expect(result).be.equal(tokenStub);
    });

    it('VerifiyToken return  false while headertoken is undefine', () => {
       //Act 
       const result = generateTokenStub.verifyToken(undefined);
        
       //Assert
       expect(result).be.false;
    });

    it('VerifiyToken return true while token is defined', () => {
        //Arrange 
        const headerToken = 'Bearer AX!@#@#@5343434343';
        const verifyStub = sinon.stub(jwt, 'verify');

        //Act
        const result = generateTokenStub.verifyToken(headerToken);

        //Assert
        expect(verifyStub.calledOnce, "Verify is called Once");
    });
})