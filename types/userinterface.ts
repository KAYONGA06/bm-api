

export interface UserInterface {
    firstName:string
    lastName: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    
};



export interface AddUserInterface extends Omit<UserInterface, 'createdAt' | 'updatedAt'> {}