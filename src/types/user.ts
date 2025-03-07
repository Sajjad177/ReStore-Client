export interface IUser {
  name: string;
  email: string;
  phoneNo: string;
  password: string;
  role: "admin" | "user";
  blocked: "ban" | "unban";
}
