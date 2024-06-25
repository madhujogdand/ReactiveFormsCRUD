import { Component, OnInit, inject, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employeeDTO';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EmployeeService } from './employee.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterOutlet, ReactiveFormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  employee: Employee = {};
  // empService: EmployeeService = inject(EmployeeService);
  empForm!: FormGroup;
  constructor(private fb: FormBuilder,private empService:EmployeeService) { }

  isUpdatebtn: boolean = false;
  ngOnInit(): void {
    this.empForm = this.fb.group({
      id: [, Validators.required],
      name: ['', Validators.required],
      salary: [, Validators.required],

    });
    this.getAllEmployees();
  }

  title = 'ReactiveFormsCRUD';



  //employeeList:Employee[]=[];
  employeeList: any = [];
  getAllEmployees() {
    this.employeeList = this.empService.getAllEmployees();
  }


  get id() {
    return this.empForm.get('id');
  }
  get name() {
    return this.empForm.get('name');
  }
  get salary() {
    return this.empForm.get('salary');
  }

  //edit the data

  editEmployees(emp: Employee) {
    this.isUpdatebtn = true;
    this.empForm.setValue({
      id: emp.id,
      name: emp.name,
      salary: emp.salary
    });

  }

  //delete the data
  deleteEmployees(id: number | undefined) {
    let response = confirm('Do you want to delete id ' + id + ' ?');
    if (response == true) {
      this.empService.deleteEmployees(id);
      this.getAllEmployees();

    }
  }

  clearForm() {
    this.empForm.reset();
    this.isUpdatebtn = false;
  }

  saveEmployee() {
    let emp = this.empForm.value;
    if (!this.isUpdatebtn) {
      this.empService.addEmployee(emp);
    }
    else {
      this.empService.updateEmployees(emp);
      this.isUpdatebtn = false;
      // this.empForm.get('id')?.enable();
    }
    this.empForm.reset();
    this.getAllEmployees();
  }


  //  saveEmployee(){

  //    if(!this.isUpdatebtn){
  //       this.empService.addEmployees(this.employee);
  //    }
  //    else{
  //      this.empService.updateEmployees(this.employee);
  //    }

  //       this.getEmployees();
  //       this.employee={};
  //       this.isUpdatebtn=false;

  //  }
}
