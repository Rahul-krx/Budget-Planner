import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './income.component.html',
  styleUrl: './income.component.scss'
})
export class IncomeComponent {
  incomeForm: any;
  selectedMonth: any;
  januaryIncomes: any[] = [
    { source: 'Salary', amount: 5000, investment: '401(k)' },
    { source: 'Freelancing', amount: 3000, investment: 'stocks' },

  ];
  februaryIncomes: any[] = [
    { source: 'Salary', amount: 6000, investment: '401(k)' },
    { source: 'Freelancing', amount: 4000, investment: 'stocks' },
    { source: 'Rental Income', amount: 2000, investment: 'Real estate' }
  ];
  marchIncomes: any[] = [
    { source: 'Salary', amount: 7000, investment: '401(k)' },
    { source: 'Freelancing', amount: 5000, investment: 'stocks' },
    { source: 'Rental Income', amount: 3000, investment: 'Real estate' }
  ];
  monthSelected: boolean = false;
  constructor(public fb: FormBuilder, public router:Router) {
    const currentDate = new Date();
    this.selectedMonth = currentDate.toLocaleString('default', { month: 'long' })
  }

  ngOnInit(): void {
    this.incomeForm = this.fb.group({
      month: ['', Validators.required],
      source: ['', Validators.required],
      amount: ['', Validators.required],
      investments: ['', Validators.required]
    })
  }
  onChange(event: any) {
    this.selectedMonth = event.target.value;
    this.monthSelected = true;
    this.getFilteredIncomes();
  }
  calculateTotalIncome(month:string):number{
    let totalIncome = 0;
    for(const income of this.getIncomesForMonth(month)){
      totalIncome += income.amount;
    }
    return totalIncome;
  }
  getIncomesForMonth(month: string): any[]{
    switch(month){
      case 'January':
        return this.januaryIncomes;
      case 'February':
        return this.februaryIncomes;
      case 'March':
        return this.marchIncomes;
      default:
        return [];
    }
  }


  getFilteredIncomes() {
    let filteredIncomes: any[] = [];
    switch (this.selectedMonth) {
      case 'January':
        filteredIncomes = [...this.januaryIncomes];
        break;
      case 'February':
        filteredIncomes = [...this.februaryIncomes];
        break;
      case 'March':
        filteredIncomes = [...this.marchIncomes];
        break;
    }
    return filteredIncomes;

  }
  onSubmit(){
    if(this.incomeForm.valid){
      const newIncome = this.incomeForm.value;

      switch(this.selectedMonth){
        case 'January':
          this.januaryIncomes.push(newIncome);
          break;
        case 'February':
          this.februaryIncomes.push(newIncome);
          break;
        case 'March':
          this.marchIncomes.push(newIncome);
          break;
        default:
          console.error('Invalid month selected');
          break;
      }
      this.incomeForm.reset();
      this.incomeForm.patchValue({month: '', source: '', investments: ''})
    }
  }

  saveForm(){
    console.log('form saved');
  }

  onBack(){
    this.router.navigate(['/budget-planner/dashboard']);
  }
}