import 'mocha';
import { expect, assert, should} from 'chai';
import * as sinon from 'sinon';
import { FileIO } from './fileIO';
import * as fs from 'fs';
import { Config } from '../utils/config';

describe('FileIO', () => {
  let fileIOMock;
  beforeEach(() => {
    fileIOMock = new FileIO("test1.json");
  });
  afterEach(() => {
  });

  it('CallOnce on CheckFile', () => {
  //Arrange
    const checkFileStub = sinon.stub();
    fileIOMock.checkFile = checkFileStub;

  //Act
    fileIOMock.checkFile();

  //Assert
    expect(checkFileStub.calledOnce, "CheckFile is called once");
  });

  it('CallOnce on file exitst on FileSystem', () => {
    //Arrange
     const existsSyncStub = sinon.stub(fs, 'existsSync').returns(true);
     
     //Act
     var result = fileIOMock.checkFile();
     
     //Assert
     expect(existsSyncStub.calledOnce, "ExistSynce is called once");
     expect(result).be.true;
  });

  it('check file in datatables return true while file is present', () => {
    //Act
    const result = fileIOMock.checkFile();

    //Assert
    expect(result).be.true;
  });
  
  it('write file and check the file return while file is found.', () => {
    //Arrange
    fileIOMock.checkFile = sinon.stub().returns(true);
    const writeFileSyncStub = sinon.stub(fs, 'writeFileSync');

    //Act
    var result = fileIOMock.writeData('test');

    //Assert
    expect(writeFileSyncStub.calledOnce, 'WriteFileSyce is called Once');
    expect(result).be.true;
  });

  it('Write data return false while filenot found.', () => {
    //Arrange
    fileIOMock.checkFile = sinon.stub().returns(false);
    
    //Act
    var result = fileIOMock.writeData('test');

    //Assert
    expect(result).be.false;
  });

  it('Get data While file found', () => {
    //Arrange
    const getDataReadStub = sinon.stub(fs, 'readFileSync').returns('[{"id":"1"}]')
    fileIOMock.checkFile = sinon.stub().returns(true);
    const expectedresult = [{id: '1'}];

    //Act
    const result = fileIOMock.getData();
    
    //Assert
    expect(getDataReadStub.calledOnce, "readFileSync called once");
    expect(result).to.deep.equal(expectedresult);
    expect(result).to.be.an('array');
  });

  it('Append File while file not found in getdata', () => {
    //Arrange
    fileIOMock.checkFile = sinon.stub().returns(false);
    const appendFileSync = sinon.stub(fs, 'appendFileSync');
  
    //Act
    fileIOMock.getData();
    
    //Assert
    expect(appendFileSync.calledOnce, "appendFileSync called once");
  });
})