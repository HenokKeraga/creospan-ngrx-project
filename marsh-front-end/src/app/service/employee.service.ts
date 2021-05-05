import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {EmployeeModel} from "../model/Employee.model";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  EMP_URL = 'http://localhost:3000/employee'

  constructor(private http: HttpClient) {
  }

  getEmployeeList(): Observable<any> {
    return this.http.get(this.EMP_URL,)
  }

  deleteEmployee(id): Observable<any> {
    return this.http.delete(`${this.EMP_URL}/${id}`)
  }

  addEmployee(data): Observable<any> {
    return this.http.post(this.EMP_URL, data)
  }

  updateEmployee(id, data): Observable<EmployeeModel> {
    return this.http.put<EmployeeModel>(`${this.EMP_URL}/${id}`, data)
  }

  getEmployeeByID(id): Observable<EmployeeModel> {
    return this.http.get<EmployeeModel>(`${this.EMP_URL}/${id}`)
  }

  saveToLocalStorage(result: EmployeeModel[]) {
    localStorage.setItem('employees', JSON.stringify(result))
  }

  getEmployeesFromLocalStorage():EmployeeModel[] {
    return JSON.parse(localStorage.getItem('employees'));
  }

  removeEmployeesFromLocalStorage() {
    localStorage.setItem('employees', '')
  }
}
