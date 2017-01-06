import BaseController from './base.controller';
import { User } from '../models/user.model';

export default class UserController extends BaseController {
    constructor() {
        super(User, '_id');
    }
}


