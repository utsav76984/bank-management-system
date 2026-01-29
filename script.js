// object 
class BankAccount {
    constructor(name, balance) {
        this.name = name;
        this.balance = balance;
    }

    deposit(amount) {
        this.balance += amount;
        return `✅ Deposit Successful! New Balance: ₹${this.balance}`;
    }
    withdraw(amount) {
        return "Withdraw method should be implemented in child class!";
    }
    checkBalance() {
        return `💰 ${this.name}, Your Current Balance is: ₹${this.balance}`;
    }
}

// Inheritance: SavingsAccount
class SavingsAccount extends BankAccount {
    constructor(name, balance) {
        super(name, balance); 
        this.minBalance = 500;
    }

    withdraw(amount) {
        if (amount > this.balance) {
            return `Insufficient Balance! Current Balance: ₹${this.balance}`;
        }

        if (this.balance - amount < this.minBalance) {
            return `Minimum Balance ₹${this.minBalance} must be maintained!`;
        }

        this.balance -= amount;
        return `✅ Withdraw Successful! New Balance: ₹${this.balance}`;
    }
}

//  Inheritance: CurrentAccount
class CurrentAccount extends BankAccount {
    constructor(name, balance) {
        super(name, balance);
        this.overdraftLimit = 1000;
    }

    withdraw(amount) {
        if (amount > this.balance + this.overdraftLimit) {
            return `Limit Exceeded! You can withdraw max ₹${this.balance + this.overdraftLimit}`;
        }

        this.balance -= amount;
        return `✅ Withdraw Successful! New Balance: ₹${this.balance}`;
    }
}

let account = null;

//create account function
function createAccount() {
    const name = document.getElementById("name").value.trim();
    const startBalance = Number(document.getElementById("startBalance").value);
    const type = document.getElementById("type").value; 

    if (name === "") {
        document.getElementById("result").innerText = "Please enter your name!";
        return;
    }

    if (startBalance < 0 || isNaN(startBalance)) {
        document.getElementById("result").innerText = "Enter a valid starting balance!";
        return;
    }

    if (type === "savings") {
        if (startBalance < 500) {
            document.getElementById("result").innerText =
                "Savings Account requires minimum ₹500!";
            return;
        }
        account = new SavingsAccount(name, startBalance);
        document.getElementById("result").innerText = `✅ Savings Account Created for ${name} with Balance ₹${startBalance}`;
    } else if (type === "current") {
        account = new CurrentAccount(name, startBalance);
        document.getElementById("result").innerText = `✅ Current Account Created for ${name} with Balance ₹${startBalance}`;
    } else {
        document.getElementById("result").innerText = "Please select account type!";
    }
}

// deposit function
function depositMoney() {
    if (!account) {
        document.getElementById("result").innerText = "Create account first!";
        return;
    }

    const amount = Number(document.getElementById("amount").value);

    if (amount <= 0 || isNaN(amount)) {
        document.getElementById("result").innerText = "Enter a valid deposit amount!";
        return;
    }

    document.getElementById("result").innerText = account.deposit(amount);
}

// withdraw function
function withdrawMoney() {
    if (!account) {
        document.getElementById("result").innerText = "Create account first!";
        return;
    }

    const amount = Number(document.getElementById("amount").value);

    if (amount <= 0 || isNaN(amount)) {
        document.getElementById("result").innerText = "Enter a valid withdraw amount!";
        return;
    }
    // SavingsAccount withdraw OR CurrentAccount withdraw
    document.getElementById("result").innerText = account.withdraw(amount);
}

// balance Inquiry
function checkBalance() {
    if (!account) {
        document.getElementById("result").innerText = "Create account first!";
        return;
    }

    document.getElementById("result").innerText = account.checkBalance();
}
