import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SideNavComponent, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  // Income
  lastMonthIncome = ['January: $10000', 'February: $1520', 'March: $1200'];
  currentMonthIncome = '$2000';
  // Expense
  lastMonthExpense = ['January: $900', 'February: $1800', 'March: $1500'];
  currentMonthExpense = '$3000';
  // Todo Trans
  todoTransactions = [
    {description: 'Pay elctricity bill'},
    {description: 'Submit montly report'},
    {description: 'Buy groceries'},
    {description: 'Call insurance company'},
    {description: 'Submit montly rent'}
  ];
  totalCurrentMonthIncome = 2000;
  totalCurrentMonthExpense = 1500;
  constructor(public router: Router) { }

  onIncome() {
    this.router.navigate(['/budget-planner/income']);
  }
  onExpense(){
    this.router.navigate(['/budget-planner/expense']);
  }
  onTodo(){
    this.router.navigate(['/budget-planner/todo']);
  }
  get currentMonthSavings(): number{
    return this.totalCurrentMonthIncome - this.totalCurrentMonthExpense;
  }
}
