// student.model.ts

export interface Student {
[x: string]: any;
  student_id: number;
  first_name: string;
  last_name: string;
  reg_no: string;
  modules?: Module[]; // Optional property for modules
}

export interface Module {
  module_code: string;
  module_name: string;
}
