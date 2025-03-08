interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }
  
  interface School {
    schoolName: string;
    schoolType: string;
    schoolEmail: string;
    phoneNumber: string;
    address: Address;
  }
  
  interface Employee {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    password: string;
    permission: number;
  }
  
  export interface SignupData {
    school: School;
    employee: Employee;
  }