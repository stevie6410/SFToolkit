import BaseController from './base.controller';
import { Company } from '../models/company.model';

export default class CompanyController extends BaseController {
    constructor() {
        super(Company, '_id');
    }
}


