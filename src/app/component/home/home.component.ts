import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/Model/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  proForm : FormGroup;
  editMode:boolean = false;
   product : Product[];
   selectedProduct : Product
  constructor( private _proService :ProductService ,
               private fb: FormBuilder,) { }

  ngOnInit() {
    this.proForm = this.fb.group({
      _id: [''],
      name: [' ', Validators.required],
      sku: [' ', Validators.required],
      description: [' ', Validators.required],
      price: [ '', Validators.required],
      stock_value: [ '', Validators.required]
    })

    this.getProduct()
  }

  getProduct(){
    this._proService.getProductList().subscribe(
      (res) => {
        console.log(res);
        this.product = res as Product[];
      },
      (err) => {
        console.log(err);
      }
    )
  }

  onProSubmit(){
    if(this.proForm.valid){
      console.log(this.proForm.value);
      
      if(this.editMode){
        this._proService.putProduct(this.proForm.value).subscribe(
          (res) => {
            console.log('Updated successfully');
            this.getProduct();
            this.editMode = false;
          },
          (err) => {
            console.log(err);
          },
        );
      }else{
        this._proService.postProduct(this.proForm.value).subscribe(
          (res) => {
            console.log('Saved successfully');
            //alert('Saved successfully')
           // this.employees = res as Employee[]
            this.getProduct();
          },
          (err) => {
            console.log(err);
          },
        );
      }
       
      this.proForm.reset();
       

    }else{

      let key = Object.keys(this.proForm.controls);
      // console.log(key);

      key.filter(data =>{
        // console.log(data);
        let control = this.proForm.controls[data];
        // console.log(control);
        if(control.errors !=null){
          control.markAsTouched();
        }
      })
    }
  }

  onEditProduct(pro: Product){
    this.editMode = true;

    console.log(pro);
     
    this.selectedProduct = pro;
    console.log(this.selectedProduct);
    this.proForm.patchValue(this.selectedProduct);
  }


  onDeleteProduct(id){
    if(confirm('Do you want to delete this Product...?')){
      // console.log(id);
      this._proService.deleteProduct(id).subscribe(
        (res) => {
          console.log('Delete successfully');
          this.getProduct();
        },
        (err) => {
          console.log(err);
        },
      );
    }
  }

  onClear(){
    this.proForm.reset()
  }
}
