import { Injectable } from "@angular/core";
import { FormBuilder } from "@angular/forms";

@Injectable()
export class AuthorsFormsService {
  constructor(private formBuilder: FormBuilder) { }

  getConfigDataTable(type: boolean) {
    const settings = {
      actions: {
        add: false,
        edit: false,
        copy: false,
        delete: false,
        position: 'left',
        columnTitle: '',
      },
      selectMode: !type ? 'single' : 'multi', // single|multi
      hideSubHeader: true,
      mode: 'external',
      edit: {
        editButtonContent: '<i class="ti-pencil text-info m-r-10"></i>',
        saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
        cancelButtonContent: '<i class="ti-close text-danger"></i>',
        confirmSave: true
      }
    };

    const columns: any = {
        firstName: {
        title: 'Primer Nombre',
        filter: false
      },
      lastName: {
        title: 'Apellido',
        filter: false
      },
      ath_update_at: {
        title: 'Fecha actualización',
        filter: false
      },
      Book: {
        title: 'Libro',
        filter: false,
        valuePrepareFunction: Book => {
          return (Book != null) ? Book.title : '';
        }
      }
    };

    (<any>settings).columns = columns;
    // (<any>settings).actions.custom = !type ? custom : '';
    return settings;
  }
}