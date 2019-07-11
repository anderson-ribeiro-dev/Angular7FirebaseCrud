import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from './../../shared/employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/shared/employee.model';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  list: Employee[];
  constructor(private  service: EmployeeService, private firestore: AngularFirestore, private toastr: ToastrService) { }

  ngOnInit() {
    this.service.getEmployees().subscribe(actionArray => {
        console.log(actionArray)
        this.list = actionArray.map(item => {
          console.log(item)
          return {
            id: item.payload.doc.id,
            ...item.payload.doc.data()
          } as Employee;
        })
      })
  }

  onEdit(emp: Employee){
    this.service.formData = Object.assign({}, emp)
  }

  onDelete(id: string) {
    if(confirm('Tem Certeza Que Deseja Deletar Esse Cadastrado!')) {
      this.firestore.doc('employees/' + id).delete()
      this.toastr.warning('Deletado Com Sucesso', 'Empregado Deletado')
    }
  }

}
