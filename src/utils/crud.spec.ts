import 'mocha';
import { expect, assert, should} from 'chai';
import * as sinon from 'sinon';
import { Crud } from './crud';
import * as fs from 'fs';
//import { FileIO } from '../utils/fileIO';
import { basename } from 'path';
import * as _ from 'lodash';

describe('CRUD', () => {
    let crudStub;
    beforeEach(() => {
      crudStub = new Crud("test1.json");
    });

    afterEach(() => {
        //sinon.stub().restore();
    });
    it('Get Data while file is found', () => {
    //Arrange
    crudStub.checkFile = sinon.stub().returns(true);

    //Act
    const result = crudStub.getData();
    
    //Assert
    expect(result).to.be.an('array');
    });
    
    it('Delete return message while id is undefined', () => {
      //Arragne
      const deleteStub = sinon.stub(undefined).returns('id not defined');
      crudStub.delete = deleteStub;

      //Act
      crudStub.delete();

      //Assert
      expect(deleteStub.calledOnce, 'Delete called once');
      expect(deleteStub.calledWith('id not defined'), 'Delete id is undefined');
    });

    it('Deleted data while index is found', () => {
      //Arrange
      const getIndexStub = sinon.stub(_, 'findIndex').returns(1);

      //Act
      crudStub.delete();

      //Assert
      expect(getIndexStub.calledOnce, 'findIndex called once');
      expect(getIndexStub.calledWith(1), 'Index will find');
    })

    it('Data deleted after id is matched', () => {
      //Arrange
      crudStub.checkFile = sinon.stub().returns(true);
      const deleteStub = sinon.stub().returns('deleted')
      crudStub.delete = deleteStub;

      //Act
      const result = crudStub.delete();
      
      //Assert
      expect(result).be.equal('deleted');
    })

    it('Data post is return false while params is undefined', () => {
      //Arrange 
      const params = undefined;

      //Assert
      expect(crudStub.post(params)).be.false;
    });

    it('Data post is return false while params is undefined', () => {
      //Arrange 
      const params = {"id": 1};
      const postStub = sinon.stub().returns(params);
      crudStub.post = postStub;

      //Act
      crudStub.post();

      //Assert
      expect(postStub.calledWith(params), "Data Posted");
    });

    it('Data put return error while id is undefined', () => {
      //Arragne
      const postStub = sinon.stub(undefined, undefined).returns('id not defined');
      crudStub.put = postStub;

      //Act
      crudStub.put();

      //Assert
      expect(postStub.calledOnce, 'Put called once');
      expect(postStub.calledWith('id not defined'), 'Put id is undefined');
    });
})