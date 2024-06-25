import { Injectable } from '@angular/core';
import { Employee } from './employeeDTO';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  addEmployee(employee:Employee):void{
    
    employee.id=this.generateEmployeeId();

    this.employeeList.push({id:employee.id,name:employee.name,salary:employee.salary});
    
  }

  employeeList:Employee[]=[];

  private id:number=101;
  constructor() {
    this.employeeList.push({id:101,name:'aaru',salary:45000});
   }

   generateEmployeeId():number{
    this.id++;
    return this.id;
   }

  public getAllEmployees():Employee[]{
     return this.employeeList;
  }

  public getEmployeesById(id:number){
    
  }

  public addEmployees(employee:Employee):void{

    employee.id=this.generateEmployeeId();

    this.employeeList.push({id:employee.id,name:employee.name,salary:employee.salary});
    
  }

  public updateEmployees(emp:Employee):void{
    for(let i=0;i<this.employeeList.length;i++){
      if(this.employeeList[i].id===emp.id){  // === to check whether value + data both are same
          this.employeeList[i].name=emp.name;
          this.employeeList[i].salary=emp.salary;
         
          break;
      }
    }

    
  }

  public deleteEmployees(id:number|undefined){
    let i=0;
    for(;i<this.employeeList.length;i++){
    if(this.employeeList[i].id===id){
              break;
    }
  }
    this.employeeList.splice(i,1);
  }
}
