import BaseController from './base.controller';
import { SWI } from '../models/swi.model';

export default class SWIController extends BaseController {
    constructor() {
        super(SWI, '_id');
    }
}


