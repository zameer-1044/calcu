import chalk from "chalk";
import inquirer from "inquirer";


interface UserInput {
    userInput: string
    userPin: string
    accountType: string
    transactionType: string
    amount: number
}
let loop = true

while (loop) {


    let userInput: UserInput = await inquirer.prompt([{
        name: "userInput",
        type: "input",
        message: chalk.blueBright.italic("Enter your user account")
    }, {
        name: "userPin",
        type: "password",
        mask: "*",
        message: chalk.redBright.italic("Enter your pin")
    }, {
        name: "accountType",
        type: "list",
        choices: ["Current", "Saving"],
        message: chalk.greenBright.italic("Slect your account type")
    }, {
        name: "transactionType",
        type: "list",
        choices: ["Fast Cash", "Cash Withdraw", "Balance Inquiry"],
        message: chalk.yellowBright.italic("Select your trsnsaction type")
    }, {
        name: "amount",
        type: "number",
        message: chalk.magentaBright.bold("Enter your amount"),
        when(userInput) {
            return userInput.transactionType === "Cash Withdraw"
        }
    }, {
        name: "amount",
        type: "list",
        choices: [2000, 4000, 5000, 8000, 10000],
        message: chalk.cyanBright.bold("Select your amount"),
        when(userInput) {
            return userInput.transactionType === "Fast Cash"
        }
    }


    ]);

    let usersID = userInput.userInput;
    let userPin = userInput.userPin;
    let accountType = userInput.accountType;
    let transactionType = userInput.transactionType;
    let amount = userInput.amount;


    if ((usersID && userPin) && userInput.transactionType === "Balance Inquiry") {
        let userBalance = 100000
        console.log(chalk.redBright.bold(`Your remaining balance is Rs ${userBalance}`))
    } else if (usersID && userPin) {
        let userBalance2 = 100000
        if (userBalance2 > amount) {
            console.log(chalk.inverse.bold(`Your account has been debited ${amount} and your remaining balance is ${userBalance2 - amount}`))
        } else {
            console.log(chalk.inverse.yellowBright.bold(`Insuffisient Balance`))
        }
    }


    let doMoreTransaction = await inquirer.prompt({
        name: "doMoreTransaction",
        type: "confirm",
        message: chalk.inverse.bold.redBright("Do you want to more transaction ??"),
        default: false

    })
    if (!doMoreTransaction.doMoreTransaction) {
        loop = false
    }

}



