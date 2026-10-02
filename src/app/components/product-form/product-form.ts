import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrls: ['./product-form.css']
})
export class ProductFormComponent {
  productForm: FormGroup;
  successMessage: string = '';
  categories: string[] = ['Electrónica', 'Ropa', 'Alimentos', 'Hogar', 'Deportes'];

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: [null, [Validators.required, Validators.min(0.01)]],
      category: ['', [Validators.required]],
      stock: [null, [Validators.required, Validators.min(1), Validators.pattern('^[0-9]*$')]]
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.productService.registerProduct(this.productForm.value).subscribe((response: boolean) => {
        if (response) {
          this.successMessage = '¡Producto registrado con éxito!';
          this.productForm.reset();
        }
      });
    } else {
      this.productForm.markAllAsTouched();
      this.successMessage = '';
    }
  }
}