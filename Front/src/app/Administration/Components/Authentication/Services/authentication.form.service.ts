import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Injectable()
export class AuthenticationFormsService {
  constructor(private formBuilder: FormBuilder) { }

  loginForm(): FormGroup {
    const form = this.formBuilder.group({
        Username: [{ value: undefined, disabled: false }, []],
        Password: [{ value: undefined, disabled: false }, []]
    });
    return form;
  }
}