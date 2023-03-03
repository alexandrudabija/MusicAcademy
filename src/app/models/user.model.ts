

export interface login {

  email: String,
  password :String,
}

export interface  ReceiveUser
{


    _id :String,
    idUser: Number;
  firstname: String;
  lastname: String;
  country: String;
  email: String;
  yearOfBirth :Date;
  password: String;
  dateRegistration: Date;
  orders: Array<any>;
    __v :Number



}

export interface changePassword {

  oldPassword:String,
  newPassword:String


}

export interface SendUser {
  idUser: Number;
  firstname: String;
  lastname: String;
  country: String;
  email: String;
  yearOfBirth :Date;
  password: String;
  dateRegistration: Date;
  orders: Array<any>;
}


export interface SendUsers
{
    SendUsers:Array<SendUser>;

}

export interface ReceiveUsers
{
    ReceiveUsers:Array<ReceiveUser>;

}
