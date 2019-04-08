'use strict';

global.chai = require('chai');
global.chai.should();

global.chaiHttp = require("chai-http");
global.chai.use(global.chaiHttp);

global.expect = global.chai.expect;
global.sinon = require('sinon');

global.sinonChai = require('sinon-chai');
global.chai.use(global.sinonChai);


