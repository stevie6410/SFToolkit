
export class SWI {
    _id: string;
    title: string;
    revision: string;
    isReleased: boolean;
    author: User;
    approver: User;
    expert: User;
    company: Company;
    stages: SWIStage[];
}

export class SWIStage{
    _id: string;
    sequence: number;
    text: string;
    imageCaption: string;
    isCriticalStep: boolean;
    carePoint: string;
    hyperlink: string;
    observations: Observation[];
}

export class Observation{
    text: string;
    jobNumber: string;
    observer: User;
}

export class User{
    firstName: string;
    lastname: string;
    username: string;
    defaultCompany: Company;
}

export class Company{
    _id : string;
    name : String;
    erpName: String;
    description: String;
}

