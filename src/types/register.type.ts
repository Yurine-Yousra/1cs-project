
export type SchoolLevelName = 'Primaire' | 'Moyenne' | 'Secondaire';
export type SchoolLevelCode = 1 | 2 | 3;

export interface SchoolInfo {
  Nom_détablissement: string;
  Type_détablissement: SchoolLevelName; // This is now strictly typed
  rue: string;
  ville: string;
  région: string;
  code_postal: string;
  Adresse_Email: string;
  Numéro_de_Téléphone: string;
}

interface Address {
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  }
  
  interface School {
    schoolName: string;
    schoolType: SchoolLevelName;
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