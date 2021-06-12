import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Injectable()
export class BooksFormsService {
  constructor(private formBuilder: FormBuilder) { }

  getFilterForm(): FormGroup {
    const form = this.formBuilder.group({
      filterFileDateStart: [{ value: undefined, disabled: false }, []],
      filterFileDateEnd: [{ value: undefined, disabled: false }, []]
    });
    return form;
  }

  getConfigDataTable(type: boolean) {
    const settings = {
      actions: {
        add: false,
        edit: !type,
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
        title: {
        title: 'Título',
        filter: false
      },
      pageCount: {
        title: 'Número de paginas',
        filter: false
      },
      publishDate: {
        title: 'Fecha de publicación',
        filter: false
      },
      name: {
        title: 'Autor',
        filter: false
      },
    };

    (<any>settings).columns = columns;
    // (<any>settings).actions.custom = !type ? custom : '';
    return settings;
  }
}