import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map, switchMap, finalize, debounceTime, tap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
})
export class AutoCompleteComponent implements OnInit, OnChanges {

  form: FormGroup;
  filteredOptions: Observable<string[]>;
  @Output() onValueChange: EventEmitter<any> = new EventEmitter<any>();
  @Input() streamData: Observable<any>;
  @Input() keys: Array<string>;
  @Input() placeHolder: string;
  @Input() validators: Array<any>;
  @Input() hasError: boolean;
  @Input() setValue: string;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.setValue !== undefined) {
      if (changes.setValue) {
        this.form.get('autocompleteValue').setValue(this.setValue);
      }
    }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      autocompleteValue: [{ value: undefined, disabled: false }, this.validators],
    });
    this.form.get('autocompleteValue').valueChanges.subscribe(value => {
      this.onValueChange.emit(value);
    });
    if (this.setValue !== undefined)
      this.form.get('autocompleteValue').setValue(this.setValue);
  }

  get displayWith(): (option?: string) => string | undefined {
    return (option?: any): string | undefined => {
      return option ? this.keys.map(x => { return option[x] }).join(' - ') : '';
    };
  }

  getlistText(option) {
    return this.keys.map(x => { return option[x] }).join(' - ')
  }

}
