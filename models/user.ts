import { Sequelize,Model,DataTypes, UUID, UUIDV4 } from "sequelize";

interface UserAttribute{
  id:string,
  firstName:string,
  lastName:string,
  email:string,
  password:string,
  CreatedAT?:Date,
  UpdatedAt?:Date,
  deletedAt?:Date|null
  
}
  export interface UserCreationAttribute extends Omit<UserAttribute,'id'>{
    id?:string
  }
export class User extends Model<UserAttribute, UserCreationAttribute> implements UserAttribute {
    public id!: string;
    public password!:string;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public CreatedAt?: Date = new Date;
    public deletedAt?: Date | null;
    public UpdatedAt?: Date;

    public association(modal:any){

    }

    public toJSON():object|UserAttribute{
      return{
        id:this.id,
        firstName:this.firstName,
        lastName:this.lastName,
        password:this.password,
        email:this.email,
        UpdatedAt:this.UpdatedAt,
        CreatedAt:this.CreatedAt,
        deletedAt:this.deletedAt
    
      }
    }
  }

  export const UserModel=(sequelize:Sequelize)=>{
    User.init({
      id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
      },
      email:{
        type:DataTypes.STRING,
        unique:true,
      },
      password:{
        type:DataTypes.STRING
      },
      firstName:{
        type:DataTypes.STRING
      },
      lastName:{
        type:DataTypes.STRING
      },
      deletedAt:{
        type:DataTypes.DATE,
      },
  
    },

     {
      sequelize,
      'timestamps':true,
      'modelName':"User",
      'tableName':"User",
      'paranoid':true,
     }
  
  )
  return User

  }



    